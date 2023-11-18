import { Action as ActionType } from "../../types";
import { SendValue } from "./SendValue";
import { TokenTransfer } from "./TokenTransfer";

function ActionSwitch({
  action,
  setAction,
}: {
  action: ActionType;
  setAction: (mutation: (e: ActionType) => ActionType | null) => void;
}) {
  switch (action.type) {
    case "tokenTransfer":
      return <TokenTransfer action={action} setAction={setAction} />;
    case "sendValue":
      return <SendValue action={action} setAction={setAction} />;
  }
}

export function Action({
  action,
  setAction,
}: {
  action: ActionType;
  setAction: (mutation: (e: ActionType) => ActionType | null) => void;
}) {
  return (
    <div className="flex items-end">
      <ActionSwitch action={action} setAction={setAction} />
      <span className="px-8">or</span>
      <button
        className="pl-4 text-red italic"
        onClick={() => {
          setAction(() => null);
        }}
      >
        Delete this action
      </button>
    </div>
  );
}
