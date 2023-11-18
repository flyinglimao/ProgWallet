// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/Clones.sol";
import {ProgWalletAccount} from "./FrogWalletAccount.sol";
import {IVerifier} from "./interfaces/IVerifier.sol";
import {IEntryPoint} from "./interfaces/IEntryPoint.sol";

contract ProgWalletAccountFactory {
    ProgWalletAccount impl;

    constructor(IEntryPoint entryPoint) {
        impl = new ProgWalletAccount(entryPoint);
    }

    function create(
        bytes32 salt,
        IVerifier verifier_
    ) external returns (ProgWalletAccount clone) {
        clone = ProgWalletAccount(
            Clones.cloneDeterministic(address(impl), salt)
        );
        clone.initialize(verifier_);
    }
}
