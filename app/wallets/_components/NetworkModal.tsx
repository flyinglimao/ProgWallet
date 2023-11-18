export function NetworkModal({
  setNetwork,
}: {
  setNetwork: (network: string) => void;
}) {
  return (
    <div className="fixed bg-[#000] bg-opacity-40 w-screen h-screen top-0 left-0 grid place-items-center">
      <div className="bg-white rounded p-4">
        <h3 className="text-xl mb-4">Select Network</h3>
        <div className="flex">
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("sepolia")}
          >
            Sepolia
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("baseGoerli")}
          >
            Base
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("celoAlfajores")}
          >
            Celo
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("mantleTestnet")}
          >
            Mantle
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("gnosisChiado")}
          >
            Gnosis
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("arbitrumSepolia")}
          >
            Arbitrum
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("scrollSepolia")}
          >
            Scroll
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("polygonMumbai")}
          >
            Polygon
          </button>
          <button
            className="border rounded px-4 py-2"
            onClick={() => setNetwork("lineaTestnet")}
          >
            Linea
          </button>
        </div>
      </div>
    </div>
  );
}
