import { createPublicClient, encodeFunctionData, http } from "viem";
import {
  factoryAddress,
  initVerifierAddress,
  rpcUrl,
  chains,
} from "@/app/constants";
import abi from "./factoryAbi.json";

export async function POST(req: Request) {
  const data = await req.json();
  const network = data.network as keyof typeof chains;
  if (!chains[network])
    return Response.json({ error: "network not supported" }, { status: 400 });

  const client = createPublicClient({
    chain: chains[network],
    transport: http(rpcUrl[network]),
  });
  const initCode = encodeFunctionData({
    abi,
    functionName: "create",
    args: [data.salt, initVerifierAddress[network]],
  });
  return Response.json({
    address: await client.readContract({
      address: factoryAddress[network] as `0x${string}`,
      abi,
      functionName: "create",
      args: [data.salt, initVerifierAddress[network]],
    }),
    initCode,
  });
}
