import { ethers } from "hardhat";

async function main() {
  console.log("Deploying INT20HUsersRegistry");
  const UsersRegistry = await ethers.getContractFactory("INT20HUsersRegistry");
  const usersRegistry = await UsersRegistry.deploy();
  await usersRegistry.waitForDeployment();
  const usersRegistryAddress = await usersRegistry.getAddress();

  console.log("Deploying INT20HProjectsRegistry");
  const ProjectsRegistry = await ethers.getContractFactory("INT20HProjectsRegistry");
  const projectsRegistry = await ProjectsRegistry.deploy(usersRegistryAddress);
  await projectsRegistry.waitForDeployment();
  const projectsRegistryAddress = await projectsRegistry.getAddress();

  console.log("Deploying INT20HCertificate");
  const Certificate = await ethers.getContractFactory("INT20HCertificate");
  const certificate = await Certificate.deploy(process.env.CERTIFICATE_URI as string);
  await certificate.waitForDeployment();
  const certificateAddress = await certificate.getAddress();

  console.log("Deploying INT20HAssigmnetsRegistry");
  const AssignmentsRegistry = await ethers.getContractFactory("INT20HAssignmentsRegistry");
  const assignmentsRegistry = await AssignmentsRegistry.deploy(usersRegistryAddress, projectsRegistryAddress, certificateAddress);
  await assignmentsRegistry.waitForDeployment();
  const assignmentsRegistryAddress = await assignmentsRegistry.getAddress();

  console.log("Setting INT20HProjectsRegistry operator");
  const projectsRegistryOperatorRole = await projectsRegistry.ASSIGMENTS_REGISTRY_ROLE();
  const setProjectsRegistryOperatorTx = await projectsRegistry.grantRole(projectsRegistryOperatorRole, assignmentsRegistryAddress);
  await setProjectsRegistryOperatorTx.wait();

  console.log("Setting INT20HCertificate operator");
  const certificateOperatorRole = await certificate.ASSIGMENTS_REGISTRY_ROLE();
  const setCertificateOperatorTx = await certificate.grantRole(certificateOperatorRole, assignmentsRegistryAddress);
  await setCertificateOperatorTx.wait();

  console.log({
    usersRegistry: usersRegistryAddress,
    projectsRegistry: projectsRegistryAddress,
    certificate: certificateAddress,
    assignmentsRegistry: assignmentsRegistryAddress,
  });
}

main().catch(console.error);
