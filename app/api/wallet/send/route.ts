import {
  concat,
  createClient,
  createPublicClient,
  encodeFunctionData,
  http,
} from "viem";
import {
  factoryAddress,
  initVerifierAddress,
  rpcUrl,
  chains,
  entryPointAddress,
} from "@/app/constants";
import abi from "../factoryAbi.json";
import { bundlerActions, getAccountNonce } from "permissionless";

export async function POST(req: Request) {
  const data = await req.json();
  const network = data.network as keyof typeof chains;
  if (!chains[network])
    return Response.json({ error: "network not supported" }, { status: 400 });

  const client = createPublicClient({
    chain: chains[network],
    transport: http(rpcUrl[network]),
  });
  const bundlerClient = createClient({
    transport: http(rpcUrl[network]),
    chain: chains[network],
  }).extend(bundlerActions);
  const initCode = concat([
    factoryAddress[network] as `0x${string}`,
    encodeFunctionData({
      abi,
      functionName: "create",
      args: [data.salt, initVerifierAddress[network]],
    }),
  ]);
  const senderAddress = (await client.readContract({
    address: factoryAddress[network] as `0x${string}`,
    abi,
    functionName: "create",
    args: [data.salt, initVerifierAddress[network]],
  })) as `0x${string}`;
  const nonce = await getAccountNonce(client, {
    sender: senderAddress,
    entryPoint: entryPointAddress[network] as `0x${string}`,
  });

  const userOperation: any = {
    sender: senderAddress,
    nonce: ("0x" + nonce.toString(16)) as `0x${string}`,
    initCode,
    callData: data.callData,
    maxFeePerGas: "0xfffffff" as `0x${string}`,
    maxPriorityFeePerGas: "0xfffffff" as `0x${string}`,
    paymasterAndData: "0x" as `0x${string}`,
    signature:
      "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000",
  };

  const estimationResult = await client.request({
    // @ts-ignore
    method: "eth_estimateUserOperationGas",
    params: [userOperation, entryPointAddress[network] as `0x${string}`],
  });

  // @ts-ignore
  userOperation["preVerificationGas"] = estimationResult["preVerificationGas"];
  userOperation["verificationGasLimit"] =
    // @ts-ignore
    estimationResult["verificationGasLimit"];
  // @ts-ignore
  userOperation["callGasLimit"] = estimationResult["callGasLimit"];

  const userOperationHash = await bundlerClient.sendUserOperation({
    userOperation: userOperation,
    entryPoint: entryPointAddress[network] as `0x${string}`,
  });
  return Response.json({
    userOperationHash,
  });
}
