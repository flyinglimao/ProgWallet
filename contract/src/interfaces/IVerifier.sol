// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface IVerifier {
    function verify(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool);
}
