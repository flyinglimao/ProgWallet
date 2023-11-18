import {
  TokenTransfer as TokenTransferType,
  Action as ActionType,
} from "../../types";
import { Guard } from "../guards/Guard";

export function TokenTransfer({
  action,
  setAction,
}: {
  action: TokenTransferType;
  setAction: (mutation: (e: ActionType) => ActionType | null) => void;
}) {
  return (
    <div className="pl-2">
      If it transfers token
      <div className="pl-2">
        <div>
          Generally,
          <Guard
            guard={action.fallback}
            setGuard={(mutation) => {
              const newGuard = mutation(action.fallback);
              if (!newGuard) throw new Error("Cannot remove fallback guard");
              setAction((e) => {
                return {
                  ...e,
                  fallback: newGuard,
                };
              });
            }}
          />
        </div>
        {action.rules.map((rule, id) => (
          <div key={`rule-${id}`}>
            If transfering amount/token id
            <select>
              <option>&gt;=</option>
              <option>=</option>
              <option>&ne;</option>
            </select>{" "}
            <input type="text" placeholder="0" className="w-20" /> and target is
            in the list:{" "}
            <input
              type="text"
              className="w-64"
              placeholder="split with comma, blank for all"
            />
            <Guard
              guard={rule.guard}
              setGuard={(mutation) => {
                const newGuard = mutation(action.fallback);
                if (!newGuard) throw new Error("Cannot remove this guard");
                setAction((old) => {
                  const old_ = old as TokenTransferType;
                  const rules = [...old_.rules];
                  rules[id].guard = newGuard;
                  return {
                    ...old,
                    rules,
                  };
                });
              }}
            />
          </div>
        ))}
        <button
          className="text-gray italic"
          onClick={() => {
            setAction((old) => {
              const old_ = old as TokenTransferType;
              return {
                ...old,
                rules: [...old_.rules, { guard: { type: "never" } }],
              };
            });
          }}
        >
          Create new rule
        </button>
      </div>
    </div>
  );
}
