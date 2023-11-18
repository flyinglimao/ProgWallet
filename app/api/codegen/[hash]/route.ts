import { readFile as _readFile } from "fs";
import { stat } from "fs";

const cwd = process.cwd();

export function fileExists(path: string): Promise<boolean> {
  return new Promise((res) => {
    stat(path, (err) => {
      res(!err);
    });
  });
}

function readFile(path: string) {
  return new Promise<string>((res, rej) => {
    _readFile(path, "utf-8", (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
}

// should let user know when failed
export async function GET(
  req: Request,
  { params: { hash } }: { params: { hash: string } }
) {
  const filePath = `${cwd}/noir-temp/${hash}/contract/noir-temp_${hash}_contract_noir_plonk_vk_sol_UltraVerifier.`;
  if (await fileExists(filePath + "abi")) {
    return Response.json({
      status: "done",
      verifier: {
        abi: await readFile(filePath + "abi"),
        bytecode: await readFile(filePath + "bin"),
      },
    });
  }

  return Response.json({ status: "waiting" });
}
