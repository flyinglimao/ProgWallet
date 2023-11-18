import { useEffect, useState } from "react";

export function useSenderAddress(salt: string, network: string) {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (!salt || !network) return;
    fetch(`/api/wallet/`, {
      method: "POST",
      body: JSON.stringify({ network, salt }),
    }).then(async (data) => {
      const json = await data.json();
      setAddress(json.address);
    });
  }, [network, salt]);

  return address;
}
