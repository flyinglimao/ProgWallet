import { useCallback, useState } from "react";
import {
  Action as ActionType,
  Destination,
  Destination as DestinationType,
  Metamorphose,
  SendValue,
  TokenTransfer,
} from "../types";
import { Action } from "./actions/Action";

function getDefaultAction(type: ActionType["type"]): ActionType {
  switch (type) {
    case "tokenTransfer":
      return {
        type: "tokenTransfer",
      } as TokenTransfer;

    case "sendValue":
      return {
        type: "sendValue",
      } as SendValue;

    case "metamorphose":
      return {
        type: "metamorphose",
      } as Metamorphose;
  }
}

// TODO: we can help user to know what contract it is (auto detect type and filter actions)
export function Destination({
  destination,
  setDestination,
}: {
  destination: Destination;
  setDestination: (
    mutation: (e: DestinationType) => DestinationType | null
  ) => void;
}) {
  const createAction = useCallback(
    (type: ActionType["type"]) => {
      setDestination((e) => ({
        ...e,
        actions: [...e.actions, getDefaultAction(type)],
      }));
    },
    [setDestination]
  );

  return (
    <div>
      For destination address{" "}
      <input
        type="text"
        value={destination.address}
        onChange={(el) =>
          setDestination((e) => ({
            ...e,
            address: el.target.value,
          }))
        }
        placeholder="0x..."
      />
      , if no rule is matched, it should{" "}
      <select
        value={destination.default}
        onChange={(el) =>
          setDestination((e) => ({
            ...e,
            default: el.target.value as "reject" | "accept",
          }))
        }
      >
        <option value="reject">Reject</option>
        <option value="accept">Accept</option>
      </select>
      .
      {destination.actions.map((action, id) => (
        <Action
          key={`action-${id}`}
          action={action}
          deleteAction={() => {
            setDestination((dest) => {
              const newActions = [...dest.actions];
              newActions.splice(id, 1);
              return {
                ...dest,
                actions: newActions,
              };
            });
          }}
        />
      ))}
      <div className="flex">
        <div className="pl-2 text-gray italic">
          Create{" "}
          <select
            value=""
            onChange={(el) =>
              el.target.value &&
              createAction(el.target.value as ActionType["type"])
            }
          >
            <option value=""></option>
            <option value="tokenTransfer">ERC20/ERC721 Token Transfer</option>
            <option value="sendValue">Send Value</option>
            <option value="metamorphose">Metamorphose (Update Verifier)</option>
          </select>{" "}
          action
        </div>
        <span className="px-8">or</span>
        <button
          className="text-red italic"
          onClick={() => {
            setDestination(() => null);
          }}
        >
          Delete this destination
        </button>
      </div>
    </div>
  );
}
