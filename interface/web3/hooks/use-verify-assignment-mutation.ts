import {useMutation} from "@tanstack/react-query";
import {Address} from "viem";
import {simulateContract, waitForTransactionReceipt, writeContract} from "wagmi/actions";
import {config} from "@/web3/config";
import {ASSIGNMENTS_REGISTRY_ADDRESS} from "@/web3/constants";
import {ASSIGNMENTS_REGISTRY_ABI} from "@/web3/abi/assignments-registry-abi";

type UseVerifyAssignmentMutationParameters = {
  projectId: number;
  student: Address
};

export function useVerifyAssignmentMutation() {
  return useMutation({
    mutationFn: async (params: UseVerifyAssignmentMutationParameters) => {
      const { request } = await simulateContract(config, {
        address: ASSIGNMENTS_REGISTRY_ADDRESS,
        abi: ASSIGNMENTS_REGISTRY_ABI,
        functionName: "gradeAssignment",
        args: [BigInt(params.projectId), params.student],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash });
    },
  });
}
