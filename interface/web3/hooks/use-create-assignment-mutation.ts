import {useMutation} from "@tanstack/react-query";
import {simulateContract, waitForTransactionReceipt, writeContract} from "wagmi/actions";
import {config} from "@/web3/config";
import {ASSIGNMENTS_REGISTRY_ABI} from "@/web3/abi/assignments-registry-abi";
import {ASSIGNMENTS_REGISTRY_ADDRESS} from "@/web3/constants";

type UseCreateAssignmentMutationParameters = {
  projectId: number;
  data: string;
};

export function useCreateAssignmentMutation() {
  return useMutation({
    mutationFn: async (params: UseCreateAssignmentMutationParameters) => {
      const { request } = await simulateContract(config, {
        address: ASSIGNMENTS_REGISTRY_ADDRESS,
        abi: ASSIGNMENTS_REGISTRY_ABI,
        functionName: "createAssignment",
        args: [BigInt(params.projectId), params.data],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
    },
  });
}
