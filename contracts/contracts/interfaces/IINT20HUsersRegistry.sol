// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct UserInfo {
    string name;
    string email;
}

interface IINT20HUsersRegistry {
    error InvalidRole(bytes32 role);

    error UserAlreadyExists(address user);

    event UserCreated(address indexed user, bytes32 indexed role, UserInfo info);

    function ADMIN_ROLE() external view returns (bytes32);

    function TEACHER_ROLE() external view returns (bytes32);

    function STUDENT_ROLE() external view returns (bytes32);

    function getUser(address user) external view returns (UserInfo memory);

    function checkAdminRole(address user) external view returns (bool);

    function checkTeacherRole(address user) external view returns (bool);

    function checkStudentRole(address user) external view returns (bool);

    function createUser(address user, bytes32 role, string calldata name, string calldata email) external;
}
