// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
//import {INT20HAssigmentsRegistry} from "./INT20HAssigmentsRegistry.sol";

contract INT20HCertificate is ERC1155 {
    using Strings for uint256;

    error MethodNotSupported();

    constructor(string memory _uri) ERC1155(_uri) {}

    function uri(uint256 projectId) public view override returns (string memory) {
        string memory _uri = super.uri(projectId);
        return string.concat(_uri, projectId.toString());
    }

    function setApprovalForAll(address, bool) public override {
        revert MethodNotSupported();
    }

    function safeTransferFrom(address, address, uint256, uint256, bytes memory) public override {
        revert MethodNotSupported();
    }

    function safeBatchTransferFrom(address, address, uint256[] memory, uint256[] memory, bytes memory) public override {
        revert MethodNotSupported();
    }
}
