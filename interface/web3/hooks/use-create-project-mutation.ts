import {useMutation} from "@tanstack/react-query";
import {simulateContract, waitForTransactionReceipt, writeContract} from "wagmi/actions";
import {Address, parseEther} from "viem";
import {config} from "@/web3/config";
import {PROJECTS_REGISTRY_ABI} from "@/web3/abi/projects-registry-abi";
import {PROJECTS_REGISTRY_ADDRESS} from "@/web3/constants";
import {ERC20_ABI} from "@/web3/abi/erc20-abi";

type UseCreateProjectMutationParameters = {
  name: string;
  description: string;
  expiresAt: Date;
  students: Address[];
  teachers: Address[];
  maxAssignments: number;
  token: Address;
  reward: number;
};

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: async (params: UseCreateProjectMutationParameters) => {
      const reward = parseEther(params.reward.toString());
      const { request: approveRequest } = await simulateContract(config, {
        address: params.token,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [PROJECTS_REGISTRY_ADDRESS, reward * BigInt(params.maxAssignments)],
      });
      const approveHash = await writeContract(config, approveRequest);
      await waitForTransactionReceipt(config, { hash: approveHash });

      const expiresAt = Math.floor(params.expiresAt.getTime() / 1000);
      const { request } = await simulateContract(config, {
        address: PROJECTS_REGISTRY_ADDRESS,
        abi: PROJECTS_REGISTRY_ABI,
        functionName: "createProject",
        args: [
          params.name,
          params.description,
          BigInt(expiresAt),
          params.students,
          params.teachers,
          BigInt(params.maxAssignments),
          params.token,
          reward,
        ],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
    },
  });
}
