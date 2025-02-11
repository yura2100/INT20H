export const ASSIGNMENTS_REGISTRY_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "usersRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "projectsRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "certificate",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "teacher",
        "type": "address"
      }
    ],
    "name": "AssignmentAlreadyGraded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AssignmentNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      }
    ],
    "name": "ProjectExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "StudentNotWhitelisted",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "teacher",
        "type": "address"
      }
    ],
    "name": "TeacherNotWhitelisted",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "student",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gradesCount",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct Assignment",
        "name": "assignment",
        "type": "tuple"
      }
    ],
    "name": "AssignmentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "teacher",
        "type": "address"
      }
    ],
    "name": "AssignmentGraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "ProjectFinished",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "createAssignment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "getAssignment",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "student",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gradesCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Assignment",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "gradeAssignment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
