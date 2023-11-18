"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { WalletRow } from "./_components/WalletRow";

export default function WalletHome() {
  const [walletAmount, setWalletAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (window?.localStorage) {
      const amount = window.localStorage.getItem("progWallet.walletAmount");
      if (amount && parseInt(amount) > 0) {
        setWalletAmount(parseInt(amount));
      }
    }
  }, []);

  const createWallet = useCallback(() => {
    const newWalletId = walletAmount + 1;
    setWalletAmount(newWalletId);
    window.localStorage.setItem(
      "progWallet.walletAmount",
      newWalletId.toString()
    );
    router.push(`/wallets/${newWalletId}`);
  }, [router, walletAmount]);

  return (
    <main className="my-4 py-4">
      <div className="mx-auto my-4 flex max-w-7xl justify-between align-middle">
        <h2 className="text-2xl">Wallets</h2>
        <button
          className="rounded bg-green px-4 py-2 text-white hover:bg-lightGreen"
          onClick={() => createWallet()}
        >
          Create
        </button>
      </div>
      <div className="mx-auto my-4 max-w-7xl rounded border">
        {walletAmount === 0 ? (
          <p className="text-center m-4">
            No wallet exists,{" "}
            <a
              href="#"
              className="text-gray underline decoration-dotted"
              onClick={() => createWallet()}
            >
              create one
            </a>
            ?
          </p>
        ) : (
          new Array(walletAmount)
            .fill(0)
            .map((_, i) => <WalletRow key={`walletRow-${i}`} id={i + 1} />)
        )}
      </div>
    </main>
  );
}
