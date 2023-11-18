"use client";

import { useEffect, useMemo, useState } from "react";
import { Rule } from "./editor/types";
import { useParams } from "next/navigation";

type Wallet = {
  name: string;
  rule: Rule;
};

export default function Wallet() {
  const [wallet, setWallet] = useState<Wallet | null>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const data = window?.localStorage.getItem(`progWallet.wallet.${id}`);
    if (!wallet && data) {
      const parsed = JSON.parse(data);
      setWallet(parsed);
    }
  }, [id, wallet]);

  return (
    <main className="my-4 py-4">
      <div className="mx-auto my-4 flex max-w-7xl justify-between align-middle">
        <h2 className="text-2xl">
          {wallet?.name ? (
            wallet.name
          ) : (
            <span className="italic text-gray">Unnamed Wallet</span>
          )}
        </h2>
        <button
          className="rounded bg-green px-4 py-2 text-white hover:bg-lightGreen"
          onClick={() => {}}
        >
          Edit
        </button>
      </div>
      <div className="mx-auto my-4 max-w-7xl rounded border">
        <div className="w-full flex align-middle justify-between p-4 border-b">
          <span>Network:</span>
          <span>Ethereum</span>
        </div>
        <div className="w-full flex align-middle justify-between p-4 border-b">
          <span>Wallet Address:</span>
          <span>0xf8F7873f80039D59783e7059ECfF5A6C49D70d47</span>
        </div>
        <div className="w-full flex align-middle justify-between p-4 border-b">
          <span>Verifier Address:</span>
          <span>0xf8F7873f80039D59783e7059ECfF5A6C49D70d47</span>
        </div>
      </div>
    </main>
  );
}
