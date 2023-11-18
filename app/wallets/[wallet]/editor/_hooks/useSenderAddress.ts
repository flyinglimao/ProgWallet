import { useEffect, useState } from "react";

export function useSenderAddress(salt: string) {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (!salt) return;
    fetch(`/api/wallet/`, {
      method: "POST",
      body: JSON.stringify({ network: "sepolia", salt }),
    }).then(async (data) => {
      const json = await data.json();
      setAddress(json.address);
    });
  }, [salt]);

  return address;
}
