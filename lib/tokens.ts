import { type Address } from "viem";

export type TokenConfig = {
  symbol: string;
  name: string;
  decimals: number;
  // Native gas token (POL) has no contract address.
  address?: Address;
  // Used for the colored token chip in the UI.
  accent: string;
};

// Native POL is always present and works with no extra config.
// Add ERC-20s by pasting their Amoy testnet contract addresses below.
// Leaving an address blank simply hides that token, nothing breaks.
export const TOKENS: TokenConfig[] = [
  {
    symbol: "POL",
    name: "Polygon (native)",
    decimals: 18,
    accent: "#8a6cff",
  },
  {
    symbol: "USDC",
    name: "USD Coin (test)",
    decimals: 6,
    // e.g. paste a USDC test-token address you control/mint on Amoy:
    // address: "0x...",
    accent: "#2775ca",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether (test)",
    decimals: 18,
    // address: "0x...",
    accent: "#c8b88a",
  },
];

// Minimal ERC-20 ABI for balanceOf + transfer.
export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;
