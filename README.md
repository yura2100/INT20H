# INT20H Hackathon Test Task (Blockchain)

**Team**: Dark Broken Boys

**Members**:
- Yurii Kabannik - [yurii.kabannik@gmail.com](mailto:yurii.kabannik@gmail.com)
- Illia Keretsman - [ilyaker1806@gmail.com](mailto:ilyaker1806@gmail.com)
- Anton Havrylenko - [an200112267@gmail.com](mailto:an200112267@gmail.com)

## Features
- All functional requirements ✅
- ERC1155 project completion certificates ✅
- ERC20 rewards distribution ✅
- UI with wallet connection ✅

## Architecture

![Components](/docs/components.png)

## Components

- [Smart Contracts](https://github.com/yura2100/INT20H/tree/main/contracts) - Solidity smart contracts
- [UI](https://github.com/yura2100/INT20H/tree/main/interface) - Next.js web interface
- [Indexer](https://github.com/yura2100/INT20H/tree/main/indexer) - Indexer for the blockchain

### Smart Contracts

Smart Contracts are written in Solidity language with [Harddhat](https://hardhat.org/) framework and [OpenZeppelin](https://www.openzeppelin.com/solidity-contracts) library.
Contracts are deployed on the [Ethereum Holesky](https://holesky.etherscan.io/) test network.

- [INT20HUsersRegistry](https://github.com/yura2100/INT20H/blob/main/contracts/contracts/INT20HUsersRegistry.sol) `0x5B77a118B7b19a1132CA142d5d55E7C636995C8d` - This contract is responsible for users creation and access control
- [INT20HProjectsRegistry](https://github.com/yura2100/INT20H/blob/main/contracts/contracts/INT20HProjectsRegistry.sol) `0xF7A7fd889EDec22F743460340adD2a53BC582E1D` - This contract is responsible for projects creation and rewards distribution
- [INT20HAssignmentsRegistry](https://github.com/yura2100/INT20H/blob/main/contracts/contracts/INT20HAssignmentsRegistry.sol) `0x1Ee0727bbaeE5D185ee0a9A7BAF127F45716A7E3` - This contract is responsible for assigments creation and verification
- [INT20HCertificate](https://github.com/yura2100/INT20H/blob/main/contracts/contracts/INT20HCertificate.sol) `0x1550295d84eC0C5007B8faFF2B284ee2c4848a29` - ERC1155 token representing certificates for successful projects completion 

### UI

UI is written in [Next.js](https://nextjs.org/) framework with [shadcn/ui](https://ui.shadcn.com/) components library.
[wagmi](https://wagmi.sh/) library is used for wallet connection and blockchain interaction.
It is deployed live on [Vercel](https://vercel.com/).

[int-20-h.vercel.app](https://int-20-h.vercel.app/)

### Indexer

Indexer is writter with [Ponder](https://ponder.sh/) framework. It indexes blockchain events and provides GraphQL API.
