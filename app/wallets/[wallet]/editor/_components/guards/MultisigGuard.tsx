import { Guard as GuardType, Multisig } from "../../types";

export function MultisigGuard({
  guard,
  setGuard,
}: {
  guard: Multisig;
  setGuard: (mutation: (e: GuardType) => GuardType) => void;
}) {
  return (
    <div className="pl-2">
      <p>
        It requires{" "}
        <input
          type="text"
          className="w-4"
          placeholder="1"
          value={guard.threshold}
          onChange={(el) => {
            setGuard((old) => {
              const old_ = old as Multisig;
              return {
                ...old_,
                threshold: parseInt(el.target.value) || 1,
              };
            });
          }}
        />{" "}
        signature(s) from follwing public keys
      </p>
      <textarea
        className="border rounded p-2"
        cols={60}
        rows={5}
        placeholder="one address per line"
        value={guard.group.join("\n")}
        onChange={(el) => {
          setGuard((old) => {
            const old_ = old as Multisig;
            return {
              ...old_,
              group: el.target.value.split("\n"),
            };
          });
        }}
      />
    </div>
  );
}
