"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Destination } from "./_components/Destination";
import { Destination as DestinationType } from "./types";
import { Guard } from "./_components/guards/Guard";
import { Wallet } from "./page";

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
    const storageData = window?.localStorage.getItem(
      `progWallet.wallet.${wallet}`
    );
    if (storageData) {
      const parsed = JSON.parse(storageData);
      setData(parsed);
    }
  }, []);

  const save = useCallback(() => {
    window?.localStorage.setItem(
      `progWallet.wallet.${wallet}`,
      JSON.stringify(data)
    );
    console.log(data);
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
          <span>Wallet Address:</span>
          <span>
            <button
              disabled
              className="bg-green hover:bg-lightGreen disabled:opacity-70 text-white rounded px-4 py-2"
            >
              Verifier must be deployed first
            </button>
          </span>
        </div>
        <div className="w-full flex items-center justify-between p-4 border-b">
          <span>Verifier Address:</span>
          <span>
            <button className="bg-green hover:bg-lightGreen disabled:opacity-70 text-white rounded px-4 py-2">
              Deploy
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
