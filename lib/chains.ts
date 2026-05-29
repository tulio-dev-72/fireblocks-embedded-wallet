import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

// Polygon Amoy testnet, chainId 80002. Native gas token is POL.
export const AMOY_RPC_URL =
  process.env.NEXT_PUBLIC_AMOY_RPC_URL ?? "https://rpc-amoy.polygon.technology";

export const amoy = polygonAmoy;
export const AMOY_CHAIN_ID = polygonAmoy.id; // 80002

// Read-only client used for balance lookups. Sends go through the user's
// embedded-wallet signer (see lib/wallet.ts), never through this client.
export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(AMOY_RPC_URL),
});

export const explorerTxUrl = (hash: string) =>
  `https://amoy.polygonscan.com/tx/${hash}`;

export const explorerAddrUrl = (addr: string) =>
  `https://amoy.polygonscan.com/address/${addr}`;
