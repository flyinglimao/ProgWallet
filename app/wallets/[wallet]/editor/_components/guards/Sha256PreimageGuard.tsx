import { Sha256Preimage } from "../../types";

export function Sha256PreimageGuard({ guard }: { guard: Sha256Preimage }) {
  return (
    <div className="pl-2">
      It requires the value whose hash is <input type="text" />
    </div>
  );
}
