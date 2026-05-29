"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { AMOY_RPC_URL } from "@/lib/chains";

const ENV_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? "";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
        // Make Polygon Amoy the network the embedded wallet operates on.
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
