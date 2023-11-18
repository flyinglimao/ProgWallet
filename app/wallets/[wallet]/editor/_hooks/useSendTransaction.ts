import { chains } from "@/app/constants";
import { useCallback, useState } from "react";
import { encodeFunctionData } from "viem";
import abi from "@/app/api/wallet/factoryAbi.json";

export function useSendTransaction(network: keyof typeof chains, salt: string) {
  const [result, setResult] = useState<any>({});
  const send = useCallback(
    (callData: string) => {
      fetch("/api/wallet/send", {
        method: "POST",
        body: JSON.stringify({
          network,
          salt,
          callData,
        }),
      }).then(async (data) => {
        setResult(await data.json());
      });
    },
    [network, salt]
  );
  return {
    execute(dest: `0x${string}`, value: bigint, data: `0x${string}`) {
      const callData = encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "dest",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "func",
                type: "bytes",
              },
            ],
            name: "execute",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "execute",
        args: [dest, value, data],
      });
      send(callData);
    },
    metamorphose(newVerifier: `0x${string}`) {
      const callData = encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: "contract IVerifier",
                name: "newVerifier",
                type: "address",
              },
            ],
            name: "metamorphose",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "metamorphose",
        args: [newVerifier],
      });
      send(callData);
    },
    result,
  };
}
