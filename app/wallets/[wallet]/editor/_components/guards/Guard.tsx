import { Guard as GuardType } from "../../types";
import { Always } from "./Always";
import { IntersectionLogic } from "./IntersectionLogic";
import { MultisigGuard } from "./MultisigGuard";
import { Never } from "./Never";
import { Sha256PreimageGuard } from "./Sha256PreimageGuard";
import { UnionLogic } from "./UnionLogic";

function getDefaultGuard(type: GuardType["type"]): GuardType {
  switch (type) {
    case "always":
      return { type: "always" };
    case "never":
      return { type: "never" };
    case "intersection":
      return { type: "intersection", rules: [] };
    case "union":
      return { type: "union", rules: [] };
    case "multisig":
      return { type: "multisig", group: [], threshold: 1 };
    case "sha256Preimage":
      return { type: "sha256Preimage", hash: "", length: 0 };
  }
}

function GuardSwitch({ guard }: { guard: GuardType }) {
  switch (guard.type) {
    case "multisig":
      return <MultisigGuard guard={guard} />;
    case "sha256Preimage":
      return <Sha256PreimageGuard guard={guard} />;
    case "intersection":
      return <IntersectionLogic guard={guard} />;
    case "union":
      return <UnionLogic guard={guard} />;
    case "never":
      return <Never />;
    case "always":
      return <Always />;
  }
}

export function Guard({
  guard,
  setGuard,
  deleteGuard,
}: {
  guard: GuardType;
  setGuard: (mutation: (e: GuardType) => GuardType | null) => void;
  deleteGuard?: () => void;
}) {
  return (
    <div>
      <GuardSwitch guard={guard} />
      {deleteGuard ? (
        <button
          className="pl-4 text-red italic"
          onClick={() => {
            deleteGuard();
          }}
        >
          Delete this guard
        </button>
      ) : (
        <div className="pl-2 text-gray italic">
          Switch to{" "}
          <select
            value=""
            onChange={(el) =>
              el.target.value &&
              setGuard(() =>
                getDefaultGuard(el.target.value as GuardType["type"])
              )
            }
          >
            <option value=""></option>
            <option value="never">Never Allow</option>
            <option value="always">Always Allow</option>
            <option value="union">Or</option>
            <option value="intersection">And</option>
            <option value="multisig">MultiSig</option>
            <option value="sha256Preimage">Preimage of Sha256 Hash</option>
          </select>{" "}
          guard
        </div>
      )}
    </div>
  );
}
