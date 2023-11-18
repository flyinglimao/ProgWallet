"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Destination } from "./_components/Destination";
import { Destination as DestinationType, Rule } from "./types";
import { Guard } from "./_components/guards/Guard";
import { useCodegen } from "./_hooks/useCodegen";
import { bytesToHex } from "viem";
import { useSenderAddress } from "./_hooks/useSenderAddress";
import { NetworkModal } from "../../_components/NetworkModal";

export type Wallet = {
  name: string;
  salt: string;
  wallet: string;
  verifier: string;
  network: string;
  rule: Rule;
};

export default function Editor() {
  const { send, status, verifier } = useCodegen();
  const router = useRouter();
  const [data, setData] = useState<Wallet>({
    name: "",
    salt: "",
    wallet: "",
    verifier: "",
    network: "",
    rule: {
      default: { type: "never" },
      destincations: [],
      metamorphoseGuard: {
        type: "never",
      },
    },
  });
  const { wallet } = useParams<{ wallet: string }>();
  const address = useSenderAddress(data.salt, data.network);

  useEffect(() => {
    setData((old) => ({
      ...old,
      wallet: address,
    }));
  }, [address]);

  useEffect(() => {
    const storageData = window?.localStorage.getItem(
      `progWallet.wallet.${wallet}`
    );
    if (storageData) {
      const parsed = JSON.parse(storageData);
      setData(parsed);
    } else {
      setData((old) => ({
        ...old,
        salt: bytesToHex(crypto.getRandomValues(new Uint8Array(32))),
      }));
    }
  }, [wallet]);

  const save = useCallback(() => {
    window?.localStorage.setItem(
      `progWallet.wallet.${wallet}`,
      JSON.stringify(data)
    );
    router.push(`/wallets/${wallet}`);
  }, [data, router, wallet]);

  return (
    <main className="my-4 py-4">
      {data.network ? null : (
        <NetworkModal
          setNetwork={(network: string) => setData((e) => ({ ...e, network }))}
        />
      )}
      <div className="mx-auto my-4 flex max-w-7xl justify-between items-center">
        <h2 className="text-2xl">
          {data?.name ? (
            data.name
          ) : (
            <span className="italic text-gray">Unnamed Wallet</span>
          )}
        </h2>
        <div className="flex items-center">
          <button
            className="rounded bg-green px-4 py-2 text-white hover:bg-lightGreen"
            onClick={() => save()}
          >
            Save
          </button>
        </div>
      </div>
      <div className="mx-auto my-4 max-w-7xl rounded border">
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Name:</span>
          <input
            type="text"
            className="w-full text-right"
            placeholder="Name this wallet (local)"
            value={data.name}
            onChange={(el) =>
              setData((e) => ({
                ...e,
                name: el.target.value,
              }))
            }
          />
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Network:</span>
          <span>{data.network}</span>
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Wallet Address:</span>
          <span>{data.wallet}</span>
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Verifier Address:</span>
          <span>
            <button
              className="bg-green hover:bg-lightGreen disabled:opacity-70 text-white rounded px-4 py-2"
              disabled={status === "waiting"}
              onClick={() => send(data.rule)}
            >
              {status === "idle"
                ? "Compile"
                : status === "waiting"
                ? "Compiling"
                : "Deploy"}
            </button>
          </span>
        </div>
        <div className="w-full p-4 border-b">
          <span>Rule:</span>
          <div className="w-full overflow-x-auto pl-2">
            <div>
              When metamorphosing (updating verifier),
              <Guard
                guard={data.rule.metamorphoseGuard}
                setGuard={(mutation) => {
                  const newGuard = mutation(data.rule.metamorphoseGuard);
                  setData((old) => ({
                    ...old,
                    rule: {
                      ...old.rule,
                      metamorphoseGuard: newGuard,
                    },
                  }));
                }}
              />
            </div>
            <div>
              If the destination address is not one of followings, it should{" "}
              <select
                value={
                  data?.rule.default.type === "never" ? "reject" : "accept"
                }
                onChange={(el) =>
                  setData((e) => ({
                    ...e,
                    rule: {
                      ...e.rule,
                      default: {
                        type: el.target.value === "reject" ? "never" : "always",
                      },
                    },
                  }))
                }
              >
                <option value="reject">Reject</option>
                <option value="accept">Accept</option>
              </select>
              .
            </div>
            {data.rule.destincations
              .filter((e) => e.address !== "self")
              .map((dest, id) => (
                <Destination
                  key={`dest-${id}`}
                  destination={dest}
                  setDestination={(
                    mutation: (e: DestinationType) => DestinationType | null
                  ) => {
                    const newDest = mutation(dest);
                    setData((old) => {
                      const newDestAry = [...old.rule.destincations];
                      if (!newDest) {
                        newDestAry.splice(id, 1);
                      } else {
                        newDestAry[id] = newDest;
                      }
                      return {
                        ...old,
                        rule: {
                          ...old.rule,
                          destincations: newDestAry,
                        },
                      };
                    });
                  }}
                />
              ))}
            <button
              className=" text-gray italic"
              onClick={() => {
                setData((old) => {
                  return {
                    ...old,
                    rule: {
                      ...old.rule,
                      destincations: [
                        ...old.rule.destincations,
                        {
                          address: "",
                          actions: [],
                          default: { type: "never" },
                        },
                      ],
                    },
                  };
                });
              }}
            >
              Create new destination
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
