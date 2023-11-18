import { UnionLogic } from "../../types";

export function UnionLogic({ guard }: { guard: UnionLogic }) {
  return (
    <div className="pl-2">
      It requires any one of the following rules satisifies:
    </div>
  );
}
