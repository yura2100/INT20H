// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct Project {
    string name;
    string description;
    address creator;
    uint256 createdAt;
    uint256 expiresAt;
    address[] students;
    address[] teachers;
    uint256 maxAssignments;
    address token;
    uint256 reward;
}

interface IINT20HProjectsRegistry {
    error ProjectNotFound();

    error InvalidStudents();

    error InvalidTeachers();

    error InvalidTotalRewards();

    event ProjectCreated(uint256 indexed projectId, Project project);

    event ProjectFinished(uint256 indexed projectId, address indexed student);

    function getProject(uint256 projectId) external view returns (Project memory);

    function getAvailableAssignments(uint256 projectId) external view returns (uint256);

    function createProject(
        string calldata name,
        string calldata description,
        uint256 expiresAt,
        address[] calldata students,
        address[] calldata teachers,
        uint256 maxAssignments,
        address token,
        uint256 reward
    ) external;

    function finishProject(uint256 projectId, address student) external;
}
