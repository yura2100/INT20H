// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct Assignment {
    string data;
    address student;
    uint256 gradesCount;
}

interface IINT20HAssignmentsRegistry {
    error AssignmentNotFound();

    error StudentNotWhitelisted(address student);

    error TeacherNotWhitelisted(address teacher);

    error ProjectExpired(uint256 projectId);

    error AssignmentAlreadyGraded(uint256 projectId, address student, address teacher);

    event AssignmentCreated(uint256 indexed projectId, Assignment assignment);

    event AssignmentGraded(uint256 indexed projectId, address indexed student, address indexed teacher);

    event ProjectFinished(uint256 indexed projectId, address indexed student);

    function getAssignment(uint256 projectId, address student) external view returns (Assignment memory);

    function createAssignment(uint256 projectId, string memory data) external;
}
