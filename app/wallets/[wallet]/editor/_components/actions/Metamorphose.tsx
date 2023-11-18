import {
  Metamorphose as MetamorphoseType,
  Action as ActionType,
} from "../../types";
import { Guard } from "../guards/Guard";

export function Metamorphose({
  action,
  setAction,
}: {
  action: MetamorphoseType;
  setAction: (mutation: (e: ActionType) => ActionType | null) => void;
}) {
  return (
    <div className="pl-2">
      If it metamorphose
      <Guard
        guard={action.guard}
        setGuard={(mutation) => {
          const newGuard = mutation(action.guard);
          if (!newGuard) throw new Error("Cannot remove fallback guard");
          setAction((e) => {
            return {
              ...e,
              guard: newGuard,
            };
          });
        }}
      />
    </div>
  );
}
