"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function Wallet() {
  const { wallet } = useParams<{ wallet: string }>();

  const walletData = useMemo(() => {
    const data = window?.localStorage.getItem(`progWallet.wallet.${wallet}`);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed;
    }
    return { name: "", wallet: "", verifier: "" };
  }, [wallet]);

  return (
    <main className="my-4 py-4">
      <div className="mx-auto my-4 flex max-w-7xl justify-between items-center">
        <h2 className="text-2xl">
          {walletData.name ? (
            walletData.name
          ) : (
            <span className="italic text-gray">Unnamed Wallet</span>
          )}
        </h2>
        <Link
          className="rounded bg-green px-4 py-2 text-white hover:bg-lightGreen"
          href={`/wallets/${wallet}/editor`}
        >
          Edit
        </Link>
      </div>
      <div className="mx-auto my-4 max-w-7xl rounded border">
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Network:</span>
          <span>Not deployed</span>
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Wallet Address:</span>
          <span>{walletData.wallet || "Not Deployed"}</span>
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Verifier Address:</span>
          <span>{walletData.verifier || "Not Deployed"}</span>
        </div>
      </div>
    </main>
  );
}
