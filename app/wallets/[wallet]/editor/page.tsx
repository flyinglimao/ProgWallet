"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Destination } from "./_components/Destination";
import { Destination as DestinationType, Rule } from "./types";
import { Guard } from "./_components/guards/Guard";

type Wallet = {
  name: string;
  rule: Rule;
};

export default function Editor() {
  const [data, setData] = useState<Wallet>({
    name: "",
    rule: {
      default: { type: "never" },
      destincations: [],
      metamorphoseGuard: {
        type: "never",
      },
    },
  });
  const { wallet } = useParams<{ wallet: string }>();

  useEffect(() => {
    const data = window?.localStorage.getItem(`progWallet.wallet.${wallet}`);
    if (!data && data) {
      const parsed = JSON.parse(data);
      setData(parsed);
    }
  }, [wallet, data]);

  const save = useCallback(() => {
    window?.localStorage.setItem(
      `progWallet.wallet.${wallet}`,
      JSON.stringify(data)
    );
  }, [data, wallet]);

  return (
    <main className="my-4 py-4">
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
          />
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Wallet Address:</span>
          <span>0xf8F7873f80039D59783e7059ECfF5A6C49D70d47</span>
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Verifier Address:</span>
          <span>0xf8F7873f80039D59783e7059ECfF5A6C49D70d47</span>
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
