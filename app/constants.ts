import {
  sepolia,
  baseGoerli,
  celoAlfajores,
  mantleTestnet,
  gnosisChiado,
  arbitrumSepolia,
  scrollSepolia,
  polygonMumbai,
  lineaTestnet,
} from "viem/chains";

export const bundlerRpcUrl: { [key in keyof typeof chains]?: string } = {
  sepolia:
    "https://eth-sepolia.g.alchemy.com/v2/z5XN3stBqLSydd_IZg4pZjr-GvrNAMWt",
  baseGoerli:
    "https://api.pimlico.io/v1/base-goerli/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
  celoAlfajores:
    "https://api.pimlico.io/v1/celo-alfajores-testnet/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
  arbitrumSepolia:
    "https://api.pimlico.io/v1/arbitrum-sepolia/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
  polygonMumbai:
    "https://api.pimlico.io/v1/mumbai/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
  lineaTestnet:
    "https://api.pimlico.io/v1/linea-testnet/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
  mantleTestnet: "???",
  scrollSepolia:
    "https://api.pimlico.io/v1/scroll-sepolia-testnet/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
  gnosisChiado:
    "https://api.pimlico.io/v1/chiado-testnet/rpc?apikey=e2856815-f259-460f-8e23-f7b160778190",
};

export const publicRpcUrl: { [key in keyof typeof chains]?: string } = {
  sepolia:
    "https://eth-sepolia.g.alchemy.com/v2/z5XN3stBqLSydd_IZg4pZjr-GvrNAMWt",
  baseGoerli: "https://goerli.base.org",
  celoAlfajores: "https://alfajores-forno.celo-testnet.org",
  arbitrumSepolia: "https://sepolia-rollup.arbitrum.io/rpc",
  polygonMumbai: "https://rpc.ankr.com/polygon_mumbai",
  lineaTestnet: "https://rpc.goerli.linea.build",
  mantleTestnet: "https://rpc.testnet.mantle.xyz",
  scrollSepolia: "https://sepolia-rpc.scroll.io",
  gnosisChiado: "https://1rpc.io/gnosis",
};

export const factoryAddress: { [key in keyof typeof chains]?: string } = {
  sepolia: "0xF40F9807048D4Bc65c174CA62A1E45C6bfDeC207",
  baseGoerli: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
  celoAlfajores: "0x7967a35dcBe3777e5234De52279D750BF5c34D2e",
  arbitrumSepolia: "0x7967a35dcBe3777e5234De52279D750BF5c34D2e",
  polygonMumbai: "0x7967a35dcBe3777e5234De52279D750BF5c34D2e",
  lineaTestnet: "0x7967a35dcBe3777e5234De52279D750BF5c34D2e",
  mantleTestnet: "0x7967a35dcBe3777e5234De52279D750BF5c34D2e",
  scrollSepolia: "0x7967a35dcBe3777e5234De52279D750BF5c34D2e",
};

export const entryPointAddress: { [key in keyof typeof chains]?: string } = {
  sepolia: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  baseGoerli: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  celoAlfajores: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  arbitrumSepolia: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  polygonMumbai: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  lineaTestnet: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  mantleTestnet: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  gnosisChiado: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  scrollSepolia: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
};

export const initVerifierAddress: {
  [key in keyof typeof chains]?: string;
} = {
  sepolia: "0x1FB8a794a9051E564d4313A760ec8E9a63144945",
  baseGoerli: "0x1FB8a794a9051E564d4313A760ec8E9a63144945",
  celoAlfajores: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
  arbitrumSepolia: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
  polygonMumbai: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
  lineaTestnet: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
  mantleTestnet: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
  scrollSepolia: "0x2927C586978713Cf8FdE7Fc6D37A53F69C1580Fa",
};

export const chains = {
  sepolia,
  baseGoerli,
  celoAlfajores,
  mantleTestnet,
  gnosisChiado,
  arbitrumSepolia,
  scrollSepolia,
  polygonMumbai,
  lineaTestnet,
};
