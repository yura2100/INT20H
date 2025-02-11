// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IINT20HCertificate {
    error MethodNotSupported();

    function mint(uint256 projectId, address student) external;
}
