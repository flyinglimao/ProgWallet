import { useCallback, useEffect, useState } from "react";
import { Rule } from "../types";

type CodegenHook = {
  send: (rule: Rule) => Promise<string>;
  status: "idle" | "waiting" | "finish";
  verifier: string;
};

export function useCodegen(): CodegenHook {
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState<CodegenHook["status"]>("idle");
  const [verifier, setVerifier] = useState("");

  const startPolling = useCallback((hash: string) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/codegen/${hash}`);
      const data = await res.json();

      if ("verifier" in data) {
        setVerifier(data.verifier);
        setStatus("finish");
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  return {
    async send(rule) {
      setStatus("waiting");
      const res = await fetch("/api/codegen", {
        method: "POST",
        body: JSON.stringify({ rule }),
      });

      const hash = ((await res.json()) as { hash: string }).hash;
      setHash(hash);
      startPolling(hash);
      return hash;
    },
    status,
    verifier,
  };
}
