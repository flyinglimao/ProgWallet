// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {BaseAccount, UserOperation, IEntryPoint} from "./core/BaseAccount.sol";
import {IVerifier} from "./interfaces/IVerifier.sol";

/**
 * The signature of ProgWallet consists of a proof and 3 public inputs.
 * The first public input is the hash of the calldata.
 * The second and third public input is the validUntil and the validAfter timestamp.
 */
contract ProgWalletAccount is BaseAccount {
    IEntryPoint immutable _entryPoint;
    IVerifier _verifier;

    constructor(IEntryPoint entryPoint_, IVerifier verifier_) {
        _entryPoint = entryPoint_;
        _verifier = verifier_;
    }

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
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
        // we use hash of calldata as public input and let user provide it in private input
        bytes32 callDataHash = keccak256(userOp.callData);
        (bytes memory proof, bytes32[] memory publicInputs) = abi.decode(
            userOp.signature,
            (bytes, bytes32[])
        );

        // force the first public input to be the hash of the calldata
        if (callDataHash != publicInputs[0]) {
            return SIG_VALIDATION_FAILED;
        }
        if (!_verifier.verify(proof, publicInputs)) {
            return SIG_VALIDATION_FAILED;
        }

        // let publicInputs[1] be the validUntil and publicInputs[2] be the validAfter
        return
            (uint256(publicInputs[1]) << 160) |
            (uint256(publicInputs[2]) << 208);
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
