import { UnionLogic as UnionLogicType, Guard as GuardType } from "../../types";
import { Guard } from "./Guard";

export function UnionLogic({
  guard,
  setGuard,
}: {
  guard: UnionLogicType;
  setGuard: (mutation: (e: GuardType) => GuardType) => void;
}) {
  return (
    <div className="pl-2">
      It requires all the following rules satisify:
      <div className="pl-2">
        {guard.rules.map((rule, id) => (
          <Guard
            key={`rule-${id}`}
            guard={rule}
            setGuard={(mutation) => {
              const newGuard = mutation(rule);
              setGuard((old) => {
                const old_ = old as UnionLogicType;
                const rules = [...old_.rules];
                rules[id] = newGuard;
                return {
                  ...old_,
                  rules,
                };
              });
            }}
            deleteGuard={() => {
              setGuard((old) => {
                const old_ = old as UnionLogicType;
                const rules = [...old_.rules];
                rules.splice(id, 1);
                return {
                  ...old_,
                  rules,
                };
              });
            }}
          />
        ))}
        <button
          className="text-gray italic"
          onClick={() => {
            setGuard((old) => {
              const old_ = old as UnionLogicType;
              return {
                ...old_,
                rules: [...old_.rules, { type: "always" }],
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
