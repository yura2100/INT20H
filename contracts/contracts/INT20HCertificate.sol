// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {IINT20HCertificate} from "./interfaces/IINT20HCertificate.sol";

contract INT20HCertificate is Context, AccessControl, ERC1155, IINT20HCertificate {
    using Strings for uint256;

    bytes32 public constant ASSIGMENTS_REGISTRY_ROLE = keccak256("ASSIGMENTS_REGISTRY_ROLE");

    constructor(string memory _uri) ERC1155(_uri) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

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

    function mint(uint256 projectId, address student) public {
        _checkRole(ASSIGMENTS_REGISTRY_ROLE, _msgSender());
        _mint(student, projectId, 1, "");
    }
}
