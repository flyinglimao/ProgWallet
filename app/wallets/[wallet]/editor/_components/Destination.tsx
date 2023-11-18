import { Destination, Destination as DestinationType } from "../types";
import { ERC20Transfer } from "./actions/ERC20Transfer";

// TODO: we can help user to know what contract it is (auto detect type and filter actions)
export function Destination({
  destination,
  setDestination,
}: {
  destination: Destination;
  setDestination: (mutation: (e: DestinationType) => DestinationType) => void;
}) {
  return (
    <div className="pl-2">
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
      <ERC20Transfer />
    </div>
  );
}
