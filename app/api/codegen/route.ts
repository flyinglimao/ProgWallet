import { createHash } from "crypto";
import {
  ExecFileOptionsWithBufferEncoding,
  execFile as _execFile,
} from "child_process";
import { codegen } from "./codegen";
import { readFile as _readFile, writeFile as _writeFile } from "fs";
import { fileExists } from "./[hash]/route";

const cwd = process.cwd();

export async function POST(req: Request) {
  const data = await req.json();
  if (!data.rule)
    return Response.json({ error: "no rule provded" }, { status: 400 });

  // compute hash
  const ruleString = JSON.stringify(data.rule);
  const hash = createHash("sha256").update(ruleString).digest("hex");

  // validate
  // for now we assume it's correct

  startBuilding(data.rule, hash);
  return Response.json({ hash });
}

function readFile(path: string) {
  return new Promise<string>((res, rej) => {
    _readFile(path, "utf-8", (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
}

function writeFile(path: string, data: string) {
  return new Promise<void>((res, rej) => {
    _writeFile(path, data, (err) => {
      if (err) rej(err);
      res();
    });
  });
}
function execFile(
  file: string,
  args: string[],
  opt: Partial<ExecFileOptionsWithBufferEncoding> = {}
) {
  return new Promise<void>((res, rej) => {
    _execFile(file, args, opt, (err) => {
      if (err) rej(err);
      res();
    });
  });
}

async function startBuilding(rule: any, hash: string) {
  if (await fileExists(`${cwd}/noir-temp/${hash}/src/main.nr`)) return;
  // copy project
  const out = await execFile("cp", [
    "-r",
    `${cwd}/noir/`,
    `${cwd}/noir-temp/${hash}`,
  ]);
  const logicCode = codegen(rule);
  const mainNr = await readFile(`${cwd}/noir-temp/${hash}/src/main.nr`);

  await writeFile(
    `${cwd}/noir-temp/${hash}/src/main.nr`,
    mainNr.replace("/*CODEGEN_LOGIC*/", logicCode)
  );

  await execFile("nargo", ["codegen-verifier"], {
    cwd: `${cwd}/noir-temp/${hash}`,
  });

  await execFile(`${cwd}/node_modules/.bin/solcjs`, [
    "--abi",
    "--bin",
    "--optimize",
    "--optimize-runs",
    "200",
    "-o",
    `${cwd}/noir-temp/${hash}/contract/`,
    `${cwd}/noir-temp/${hash}/contract/noir/plonk_vk.sol`,
  ]);
}
