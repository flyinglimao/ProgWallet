import { MultisigGuard } from "../guards/MultisigGuard";

export function ERC20Transfer() {
  return (
    <div className="pl-2">
      <div>
        If the sending value is greater than or eqauls <input type="text" />
        <MultisigGuard />
      </div>
      <div>
        Otherwise
        <div>
          It requires <input type="text" /> signature(s) from follwing public
          keys (address)
          <div>0xabc</div>
          <div>0xabc</div>
        </div>
      </div>
    </div>
  );
}
