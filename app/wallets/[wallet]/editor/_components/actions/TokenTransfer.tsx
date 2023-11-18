import {
  TokenTransfer as TokenTransferType,
  Action as ActionType,
  ValueRule,
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
            <select
              value={rule.op}
              onChange={(el) => {
                setAction((old) => {
                  const old_ = old as TokenTransferType;
                  const rules = [...old_.rules];
                  rules[id].op = el.target.value as ValueRule["op"];
                  return {
                    ...old,
                    rules,
                  };
                });
              }}
            >
              <option value="gt">&gt;</option>
              <option value="eq">=</option>
              <option value="lt">&lt;</option>
              <option value="ne">&ne;</option>
            </select>{" "}
            <input
              type="text"
              placeholder="0"
              className="w-20"
              value={rule.limit}
              onChange={(el) => {
                setAction((old) => {
                  const old_ = old as TokenTransferType;
                  const rules = [...old_.rules];
                  rules[id].limit = parseInt(el.target.value) || 100;
                  return {
                    ...old,
                    rules,
                  };
                });
              }}
            />{" "}
            and target is in the list:{" "}
            <input
              type="text"
              className="w-64"
              placeholder="split with comma, blank for all"
            />
            <div className="flex items-end">
              <Guard
                guard={rule.guard}
                setGuard={(mutation) => {
                  const newGuard = mutation(action.fallback);
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
              <span className="px-8">or</span>
              <button
                className="text-red italic"
                onClick={() => {
                  setAction((old) => {
                    const old_ = old as TokenTransferType;
                    const rules = [...old_.rules];
                    rules.splice(id, 1);
                    return {
                      ...old,
                      rules,
                    };
                  });
                }}
              >
                Delete this rule
              </button>
            </div>
          </div>
        ))}
        <button
          className="text-gray italic"
          onClick={() => {
            setAction((old) => {
              const old_ = old as TokenTransferType;
              return {
                ...old,
                rules: [
                  ...old_.rules,
                  { guard: { type: "never" }, op: "gt", limit: 0 },
                ],
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
