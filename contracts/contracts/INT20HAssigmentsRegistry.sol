// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {IINT20HAssigmentsRegistry, Assignment} from "./interfaces/IINT20HAssigmentsRegistry.sol";
import {IINT20HUsersRegistry} from "./interfaces/IINT20HUsersRegistry.sol";
import {IINT20HProjectsRegistry, Project} from "./interfaces/IINT20HProjectsRegistry.sol";
import {IINT20HCertificate} from "./interfaces/IINT20HCertificate.sol";

contract INT20HAssigmentsRegistry is Context, IINT20HAssigmentsRegistry {
    IINT20HUsersRegistry private _usersRegistry;
    IINT20HProjectsRegistry private _projectsRegistry;
    IINT20HCertificate private _certificate;
    // projectId => assignmentId => Assignment
    mapping(uint256 => mapping(address => Assignment)) private _assignments;
    // projectId => student => teacher => isGraded
    mapping (uint256 => mapping(address => mapping(address => bool))) private _grades;

    constructor(address usersRegistry, address projectsRegistry, address certificate) {
        _usersRegistry = IINT20HUsersRegistry(usersRegistry);
        _projectsRegistry = IINT20HProjectsRegistry(projectsRegistry);
        _certificate = IINT20HCertificate(certificate);
    }

    function getAssignment(uint256 projectId, address student) public view returns (Assignment memory) {
        Assignment memory assignment = _assignments[projectId][student];
        if (assignment.student == address(0)) {
            revert AssignmentNotFound();
        }

        return assignment;
    }

    function createAssignment(uint256 projectId, string memory data) public {
        address sender = _msgSender();
        _usersRegistry.checkStudentRole(sender);

        Project memory project = _projectsRegistry.getProject(projectId);
        _verifyStudentWhitelisted(project, sender);

        if (block.timestamp >= project.expiresAt) {
            revert ProjectExpired(projectId);
        }

        Assignment memory assignment;
        assignment.data = data;
        assignment.student = sender;
        _assignments[projectId][sender] = assignment;

        emit AssignmentCreated(projectId, assignment);
    }

    function gradeAssignment(uint256 projectId, address student) public {
        address sender = _msgSender();
        _usersRegistry.checkTeacherRole(sender);

        Project memory project = _projectsRegistry.getProject(projectId);
        _verifyTeacherWhitelisted(project, sender);

        Assignment memory assignment = getAssignment(projectId, student);
        if (_grades[projectId][student][sender]) {
            revert AssignmentAlreadyGraded(projectId, student, sender);
        }

        _assignments[projectId][student].gradesCount++;
        _grades[projectId][student][sender] = true;

        emit AssignmentGraded(projectId, student, sender);

        if (_assignments[projectId][student].gradesCount == project.teachers.length) {
            _projectsRegistry.finishProject(projectId, student);
            _certificate.mint(projectId, student);

            emit ProjectFinished(projectId, student);
        }
    }

    function _verifyStudentWhitelisted(Project memory project, address student) private view {
        if (project.students.length == 0) {
            return;
        }

        for (uint256 i = 0; i < project.students.length; i++) {
            if (project.students[i] == student) {
                return;
            }
        }

        revert StudentNotWhitelisted(student);
    }

    function _verifyTeacherWhitelisted(Project memory project, address teacher) private view {
        for (uint256 i = 0; i < project.teachers.length; i++) {
            if (project.teachers[i] == teacher) {
                return;
            }
        }

        revert TeacherNotWhitelisted(teacher);
    }
}
