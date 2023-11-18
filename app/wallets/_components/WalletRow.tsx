"use client";

import Link from "next/link";
import { useMemo } from "react";

export function WalletRow({ id }: { id: number }) {
  const [walletName, network] = useMemo(() => {
    const data = window?.localStorage.getItem(`progWallet.wallet.${id}`);
    if (data) {
      const parsed = JSON.parse(data);
      return [parsed.name, parsed.network];
    }
    return [];
  }, [id]);
  return (
    <Link
      className="w-full px-4 py-2 border-b flex justify-between items-center"
      href={`/wallets/${id}`}
    >
      {walletName ? (
        walletName
      ) : (
        <span className="italic text-gray">Unnamed Wallet</span>
      )}

      <span className="text-sm bg-lightGreen bg-opacity-30 p-2 rounded">
        {network || "Undeployed"}
      </span>
    </Link>
  );
}
