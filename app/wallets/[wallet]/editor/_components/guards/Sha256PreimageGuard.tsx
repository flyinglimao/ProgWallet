import { Guard as GuardType, Sha256Preimage } from "../../types";

export function Sha256PreimageGuard({
  guard,
  setGuard,
}: {
  guard: Sha256Preimage;
  setGuard: (mutation: (e: GuardType) => GuardType) => void;
}) {
  return (
    <div className="pl-2">
      It requires the value with length{" "}
      <input
        type="text"
        placeholder="10"
        className="w-6"
        value={guard.length}
        onChange={(el) =>
          setGuard((old) => {
            const old_ = old as Sha256Preimage;
            return {
              ...old_,
              length: parseInt(el.target.value) || 32,
            };
          })
        }
      />{" "}
      whose hash is{" "}
      <input
        type="text"
        placeholder="0x..."
        value={guard.hash}
        onChange={(el) =>
          setGuard((old) => {
            const old_ = old as Sha256Preimage;
            return {
              ...old_,
              hash: el.target.value,
            };
          })
        }
      />
    </div>
  );
}
