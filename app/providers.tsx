"use client";

import { useEffect, useState } from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { AMOY_RPC_URL } from "@/lib/chains";

const ENV_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? "";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Dynamic injects styles at runtime that differ between server and client
  // render, which trips React's hydration check. Mounting it client-side only
  // avoids the mismatch without affecting functionality.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <DynamicContextProvider
      settings={{
        environmentId: ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: [
            {
              blockExplorerUrls: ["https://amoy.polygonscan.com"],
              chainId: 80002,
              chainName: "Polygon Amoy",
              iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
              name: "Polygon Amoy",
              nativeCurrency: { decimals: 18, name: "POL", symbol: "POL" },
              networkId: 80002,
              rpcUrls: [AMOY_RPC_URL],
              vanityName: "Amoy Testnet",
            },
          ],
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
