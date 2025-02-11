// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IINT20HProjectsRegistry, Project} from "./interfaces/IINT20HProjectsRegistry.sol";
import {IINT20HUsersRegistry} from "./interfaces/IINT20HUsersRegistry.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract INT20HProjectsRegistry is Context, AccessControl, IINT20HProjectsRegistry {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant ASSIGMENTS_REGISTRY_ROLE = keccak256("ASSIGMENTS_REGISTRY_ROLE");

    uint256 private _currentProjectId;
    IINT20HUsersRegistry private _usersRegistry;
    mapping(uint256 projectId => Project project) private _projects;
    mapping(uint256 projectId => uint256 availableAssignments) private _availableAssignments;
    EnumerableSet.AddressSet private _studentsSet;
    EnumerableSet.AddressSet private _teachersSet;

    constructor(address usersRegistry) {
        _usersRegistry = IINT20HUsersRegistry(usersRegistry);
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function getProject(uint256 projectId) public view override returns (Project memory) {
        Project memory project =  _projects[projectId];
        if (project.creator == address(0)) {
            revert ProjectNotFound();
        }

        return project;
    }

    function getAvailableAssignments(uint256 projectId) public view returns (uint256) {
        return _availableAssignments[projectId];
    }

    function createProject(
        string calldata name,
        string calldata description,
        uint256 expiresAt,
        address[] calldata students,
        address[] calldata teachers,
        uint256 maxAssignments,
        address token,
        uint256 reward
    ) public {
        address sender = _msgSender();
        _usersRegistry.checkTeacherRole(sender);

        _verifyStudents(students);
        _verifyteachers(teachers);

        uint256 totalRewards = reward * maxAssignments;
        if (totalRewards == 0) {
            revert InvalidTotalRewards();
        }

        IERC20(token).safeTransferFrom(sender, address(this), totalRewards);
        uint256 projectId = ++_currentProjectId;
        _availableAssignments[projectId] = maxAssignments;

        Project memory project;
        project.name = name;
        project.description = description;
        project.creator = sender;
        project.createdAt = block.timestamp;
        project.expiresAt = expiresAt;
        project.students = students;
        project.teachers = teachers;
        project.maxAssignments = maxAssignments;
        project.token = token;
        project.reward = reward;
        _projects[projectId] = project;

        emit ProjectCreated(projectId, project);
    }

    function finishProject(uint256 projectId, address student) public {
        _checkRole(ASSIGMENTS_REGISTRY_ROLE, _msgSender());

        Project memory project = getProject(projectId);
        if (_availableAssignments[projectId] > 0) {
            IERC20(project.token).safeTransfer(student, project.reward);
            _availableAssignments[projectId]--;
        }

        emit ProjectFinished(projectId, student);
    }

    function _verifyStudents(address[] calldata students) private {
        if (students.length == 0) {
            return;
        }

        for (uint256 i = 0; i < students.length; i++) {
            address student = students[i];
            _usersRegistry.checkStudentRole(student);
            _studentsSet.add(student);
        }

        if (_studentsSet.length() != students.length) {
            revert InvalidStudents();
        }

        for (uint256 i = 0; i < students.length; i++) {
            _studentsSet.remove(students[i]);
        }
    }

    function _verifyteachers(address[] calldata teachers) private {
        if (teachers.length == 0) {
            revert InvalidTeachers();
        }

        for (uint256 i = 0; i < teachers.length; i++) {
            address teacher = teachers[i];
            _usersRegistry.checkTeacherRole(teacher);
            _teachersSet.add(teacher);
        }

        if (_teachersSet.length() != teachers.length) {
            revert InvalidTeachers();
        }

        for (uint256 i = 0; i < teachers.length; i++) {
            _teachersSet.remove(teachers[i]);
        }
    }
}
