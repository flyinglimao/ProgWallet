// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {IVerifier} from "./interfaces/IVerifier.sol";

struct Transaction {
    // The type of the transaction.
    uint256 txType;
    // The caller.
    uint256 from;
    // The callee.
    uint256 to;
    // The gasLimit to pass with the transaction.
    // It has the same meaning as Ethereum's gasLimit.
    uint256 gasLimit;
    // The maximum amount of gas the user is willing to pay for a byte of pubdata.
    uint256 gasPerPubdataByteLimit;
    // The maximum fee per gas that the user is willing to pay.
    // It is akin to EIP1559's maxFeePerGas.
    uint256 maxFeePerGas;
    // The maximum priority fee per gas that the user is willing to pay.
    // It is akin to EIP1559's maxPriorityFeePerGas.
    uint256 maxPriorityFeePerGas;
    // The transaction's paymaster. If there is no paymaster, it is equal to 0.
    uint256 paymaster;
    // The nonce of the transaction.
    uint256 nonce;
    // The value to pass with the transaction.
    uint256 value;
    // In the future, we might want to add some
    // new fields to the struct. The `txData` struct
    // is to be passed to account and any changes to its structure
    // would mean a breaking change to these accounts. In order to prevent this,
    // we should keep some fields as "reserved".
    // It is also recommended that their length is fixed, since
    // it would allow easier proof integration (in case we will need
    // some special circuit for preprocessing transactions).
    uint256[4] reserved;
    // The transaction's calldata.
    bytes data;
    // The signature of the transaction.
    bytes signature;
    // The properly formatted hashes of bytecodes that must be published on L1
    // with the inclusion of this transaction. Note, that a bytecode has been published
    // before, the user won't pay fees for its republishing.
    bytes32[] factoryDeps;
    // The input to the paymaster.
    bytes paymasterInput;
    // Reserved dynamic type for the future use-case. Using it should be avoided,
    // But it is still here, just in case we want to enable some additional functionality.
    bytes reservedDynamic;
}

// zkSync special standard
interface IAccount {
    /// @notice Called by the bootloader to validate that an account agrees to process the transaction
    /// (and potentially pay for it).
    /// @param _txHash The hash of the transaction to be used in the explorer
    /// @param _suggestedSignedHash The hash of the transaction is signed by EOAs
    /// @param _transaction The transaction itself
    /// @return magic The magic value that should be equal to the signature of this function
    /// if the user agrees to proceed with the transaction.
    /// @dev The developer should strive to preserve as many steps as possible both for valid
    /// and invalid transactions as this very method is also used during the gas fee estimation
    /// (without some of the necessary data, e.g. signature).
    function validateTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable returns (bytes4 magic) {
        (magic, ) = abi.decode((bytes4, bytes), _transaction.data);
    }

    function executeTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable {}

    // There is no point in providing possible signed hash in the `executeTransactionFromOutside` method,
    // since it typically should not be trusted.
    function executeTransactionFromOutside(
        Transaction calldata _transaction
    ) external payable {}

    function payForTransaction(
        bytes32 _txHash,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable {}

    function prepareForPaymaster(
        bytes32 _txHash,
        bytes32 _possibleSignedHash,
        Transaction calldata _transaction
    ) external payable {}
}

/**
 * The signature of ProgWallet consists of a proof and 3 public inputs.
 * The 1st and 2nd public input are the hash of the calldata and length.
 * The 3rd and 4th public input are the validUntil and the validAfter timestamp.
 */
contract ProgWalletAccount is IAccount, Initializable {
    IEntryPoint immutable _entryPoint;
    IVerifier _verifier;

    constructor(IEntryPoint entryPoint_) {
        _entryPoint = entryPoint_;
    }

    function initialize(IVerifier verifier_) external initializer {
        _verifier = verifier_;
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    function verifier() public view returns (IVerifier) {
        return _verifier;
    }

    // replace verifier
    function metamorphose(IVerifier newVerifier) external {
        _requireFromEntryPoint();

        _verifier = newVerifier;
    }

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _requireFromEntryPoint();
        _call(dest, value, func);
    }

    /**
     * Validate the signature is valid for this message.
     * @param userOp          - Validate the userOp.signature field.
     * @param userOpHash      - Convenient field: the hash of the request, to check the signature against.
     *                          (also hashes the entrypoint and chain id)
     * @return validationData - Signature and time-range of this operation.
     *                          <20-byte> sigAuthorizer - 0 for valid signature, 1 to mark signature failure,
     *                              otherwise, an address of an "authorizer" contract.
     *                          <6-byte> validUntil - last timestamp this operation is valid. 0 for "indefinite"
     *                          <6-byte> validAfter - first timestamp this operation is valid
     *                          If the account doesn't use time-range, it is enough to return
     *                          SIG_VALIDATION_FAILED value (1) for signature failure.
     *                          Note that the validation code cannot use block.timestamp (or block.number) directly.
     */
    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        // let publicInputs[2] be the validUntil and publicInputs[3] be the validAfter
        return 0;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }
}
