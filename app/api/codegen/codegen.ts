import {
  Action,
  Guard,
  IntersectionLogic,
  Rule,
  Sha256Preimage,
  UnionLogic,
} from "@/app/wallets/[wallet]/editor/types";

function guardCodegen(guard: Guard): string {
  switch (guard.type) {
    case "never":
      return `false`;
    case "always":
      return `true`;
    case "multisig":
      return `
        (|| -> bool {
          let mut pass = false;
          
          pass
        })()
      `;
    case "sha256Preimage":
      return `
        (|| -> bool {
          let mut pass = false;
          
          pass
        })()
      `;
    case "intersection":
      return `
        (|| -> bool {
          let mut pass = false;
          ${(guard as IntersectionLogic).rules
            .map((subGuard) => `pass &= ${guardCodegen(subGuard)};`)
            .join("\n")}
          pass
        })()
      `;
    case "union":
      return `
        (|| -> bool {
          let mut pass = false;
          ${(guard as UnionLogic).rules
            .map((subGuard) => `pass |= ${guardCodegen(subGuard)};`)
            .join("\n")}
          pass
        })()
      `;
  }
}

function toCirucitPubKey(pubKey: string): string {
  return `[1, 2, 3]`;
}

function addrToU8L20(str: string): string {
  return "[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]";
}
function numToU8L32(num: number): string {
  return "[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2]";
}

function actionCodegen(action: Action): string {
  switch (action.type) {
    case "sendValue":
      return `
        pass = ${guardCodegen(action.fallback)};
        ${action.rules // prepare
          .map((rule, idx) => {
            if (rule.target) {
              return `
              let group${idx} = [
                ${rule.target.map((dest) => addrToU8L20(dest)).join(",")}
              ];
            `;
            }
          })}
        ${
          action.rules.length
            ? action.rules
                .map((rule, idx) => {
                  const cond = [];
                  if (rule.target) {
                    cond.push(`group${idx}.any(|a| a == dest)`);
                  }

                  if (rule.op) {
                    cond.push(
                      `actions::value::check_value_${
                        rule.op
                      }(value, ${numToU8L32(rule.limit)})`
                    );
                  }

                  return `
            if ${cond.join(" && ")} {
              pass = ${guardCodegen(rule.guard)};
            }
          `;
                })
                .join(" else ") + ";"
            : ""
        }
      `;
    case "tokenTransfer":
      return `
        pass = ${guardCodegen(action.fallback)};
        ${action.rules // prepare
          .map((rule, idx) => {
            if (rule.target) {
              return `
              let group${idx} = [
                ${rule.target.map((dest) => addrToU8L20(dest)).join(",")}
              ];
            `;
            }
          })}
        ${
          action.rules.length
            ? action.rules // prepare
                .map((rule, idx) => {
                  const cond = [];
                  if (rule.target) {
                    cond.push(
                      `actions::transfer::check_transfer_dest(data, group${idx})`
                    );
                  }

                  if (rule.op) {
                    cond.push(
                      `actions::transfer::check_transfer_${
                        rule.op
                      }(data, ${numToU8L32(rule.limit)})`
                    );
                  }

                  return `
            if ${cond.join(" && ")} {
              pass = ${guardCodegen(rule.guard)};
            }
          `;
                })
                .join(" else ") + ";"
            : ""
        }
      `;
  }
}

export function codegen(rule: Rule): string {
  let code = "";
  if (rule.default.type === "always") {
    code += `let mut pass = true;`;
  } else {
    code += `let mut pass = false;`;
  }

  const cond = [];
  // I guess we need to check the dest here
  cond.push(`
    if function_sig::is_metamorphose(selector) {
      pass = ${guardCodegen(rule.metamorphoseGuard)};
    }
  `);

  cond.push(
    ...rule.destincations.map((dest) => {
      const actionCodes = dest.actions
        .map((action) => {
          return actionCodegen(action);
        })
        .join("\n");

      return `
        if dest == ${addrToU8L20(dest.address)} {
          ${actionCodes}
        }
      `;
    })
  );
  code += cond.join(" else ") + ";";

  code += "assert(pass);";
  return code;
}
