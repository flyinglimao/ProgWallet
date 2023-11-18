// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/proxy/Clones.sol";
import {ProgWalletAccount} from "./ProgWalletAccount.sol";
import {IVerifier} from "./interfaces/IVerifier.sol";

contract ProgWalletAccountFactory {
    ProgWalletAccount impl;

    constructor() {
        impl = new ProgWalletAccount();
    }

    function create(
        bytes32 salt,
        IVerifier verifier_
    ) external returns (ProgWalletAccount clone) {
        clone = Clones.clone(impl, salt);
        clone.initialize(verifier_);
    }
}
