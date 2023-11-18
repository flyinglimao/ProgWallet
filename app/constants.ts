import { sepolia } from "viem/chains";

export const rpcUrl: { [key in keyof typeof chains]?: string } = {
  sepolia:
    "https://eth-sepolia.g.alchemy.com/v2/z5XN3stBqLSydd_IZg4pZjr-GvrNAMWt",
};

export const factoryAddress: { [key in keyof typeof chains]?: string } = {
  sepolia: "0xF40F9807048D4Bc65c174CA62A1E45C6bfDeC207",
};
export const initVerifierAddress: {
  [key in keyof typeof chains]?: string;
} = {
  sepolia: "0x1FB8a794a9051E564d4313A760ec8E9a63144945",
};

export const chains = {
  sepolia,
};
