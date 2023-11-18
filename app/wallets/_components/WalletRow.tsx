"use client";

import Link from "next/link";
import { useMemo } from "react";

export function WalletRow({ id }: { id: number }) {
  const walletName = useMemo(() => {
    const data = window?.localStorage.getItem(`progWallet.wallet.${id}`);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.name;
    }
  }, [id]);
  return (
    <Link className="block w-full p-4 border-b" href={`/wallets/${id}`}>
      {walletName ? (
        walletName
      ) : (
        <span className="italic text-gray">Unnamed Wallet</span>
      )}
    </Link>
  );
}
