// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {BaseAccount, UserOperation, IEntryPoint} from "./core/BaseAccount.sol";
import {IVerifier} from "./interfaces/IVerifier.sol";

/**
 * The signature of ProgWallet consists of a proof and 3 public inputs.
 * The 1st and 2nd public input are the hash of the calldata and length.
 * The 3rd and 4th public input are the validUntil and the validAfter timestamp.
 */
contract ProgWalletAccount is BaseAccount, Initializable {
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
