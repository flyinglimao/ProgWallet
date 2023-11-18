import { Guard as GuardType } from "../../types";
import { IntersectionLogic } from "./IntersectionLogic";
import { MultisigGuard } from "./MultisigGuard";
import { Sha256PreimageGuard } from "./Sha256PreimageGuard";
import { UnionLogic } from "./UnionLogic";

export function Guard({ guard }: { guard: GuardType }) {
  switch (guard.type) {
    case "multisig":
      return <MultisigGuard guard={guard} />;
    case "sha256Preimage":
      return <Sha256PreimageGuard guard={guard} />;
    case "intersection":
      return <IntersectionLogic guard={guard} />;
    case "union":
      return <UnionLogic guard={guard} />;
  }
}
