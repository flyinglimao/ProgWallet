import { createHash } from "crypto";
import { execFile } from "child_process";

export async function POST(req: Request) {
  const data = await req.json();
  if (!data.rule)
    return Response.json({ error: "no rule provded" }, { status: 400 });

  // compute hash
  const ruleString = JSON.stringify(data.rule);
  const hash = createHash("sha256").update(ruleString).digest("hex");

  return Response.json({ hash });
}

function startBuilding() {}
