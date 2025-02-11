// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IINT20HUsersRegistry, UserInfo} from "./interfaces/IINT20HUsersRegistry.sol";

contract INT20HUsersRegistry is Context, AccessControl, IINT20HUsersRegistry {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant TEACHER_ROLE = keccak256("TEACHER_ROLE");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");

    mapping(address user => UserInfo info) private _users;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function getUser(address user) public view returns (UserInfo memory) {
        return _users[user];
    }

    function checkAdminRole(address user) public view returns (bool) {
        _checkRole(ADMIN_ROLE, user);
        return true;
    }

    function checkTeacherRole(address user) public view returns (bool) {
        _checkRole(TEACHER_ROLE, user);
        return true;
    }

    function checkStudentRole(address user) public view returns (bool) {
        _checkRole(STUDENT_ROLE, user);
        return true;
    }

    function createUser(
        address user,
        bytes32 role,
        string calldata name,
        string calldata email
    ) public {
        address sender = _msgSender();
        if (!(hasRole(DEFAULT_ADMIN_ROLE, sender) || hasRole(ADMIN_ROLE, sender))) {
            revert AccessControlUnauthorizedAccount(sender, ADMIN_ROLE);
        }

        if (role != ADMIN_ROLE || role != TEACHER_ROLE || role != STUDENT_ROLE) {
            revert InvalidRole(role);
        }

        bool isSuccess = _grantRole(role, user);
        if (!isSuccess) {
            revert UserAlreadyExists(user);
        }

        UserInfo memory info;
        info.name = name;
        info.email = email;
        _users[user] = info;

        emit UserCreated(user, role, info);
    }
}
