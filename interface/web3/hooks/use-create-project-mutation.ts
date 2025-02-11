import {useMutation} from "@tanstack/react-query";
import {simulateContract, waitForTransactionReceipt, writeContract} from "wagmi/actions";
import {Address, parseEther} from "viem";
import {config} from "@/web3/config";
import {PROJECTS_REGISTRY_ABI} from "@/web3/abi/projects-registry-abi";
import {PROJECTS_REGISTRY_ADDRESS} from "@/web3/constants";

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
          parseEther(params.reward.toString()),
        ],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
    },
  });
}
