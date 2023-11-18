import { Multisig } from "../../types";

export function MultisigGuard({ guard }: { guard: Multisig }) {
  return (
    <div className="pl-2">
      It requires <input type="text" /> signature(s) from follwing public keys
      (address)
      <div className="pl-2">
        <div>0xabc</div>
        <div>0xabc</div>
      </div>
    </div>
  );
}
