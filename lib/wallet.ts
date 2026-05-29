import {
  formatUnits,
  parseEther,
  parseUnits,
  type Address,
  type Hash,
} from "viem";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { publicClient } from "./chains";
import { ERC20_ABI, type TokenConfig } from "./tokens";

// Read the on-chain balance for a token (native POL or ERC-20).
export async function readBalance(
  token: TokenConfig,
  account: Address
): Promise<string> {
  if (!token.address) {
    // Native POL
    const wei = await publicClient.getBalance({ address: account });
    return formatUnits(wei, token.decimals);
  }
  const raw = (await publicClient.readContract({
    address: token.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [account],
  })) as bigint;
  return formatUnits(raw, token.decimals);
}

// Send a token from the user's embedded wallet. The signing happens inside
// Dynamic's MPC embedded wallet, this app never holds a private key.
export async function sendToken(
  wallet: unknown,
  token: TokenConfig,
  to: Address,
  amount: string
): Promise<Hash> {
  if (!wallet || !isEthereumWallet(wallet)) {
    throw new Error("No Ethereum embedded wallet available.");
  }
  const walletClient = await wallet.getWalletClient();

  if (!token.address) {
    // Native POL transfer
    return walletClient.sendTransaction({
      to,
      value: parseEther(amount),
    });
  }

  // ERC-20 transfer
  return walletClient.writeContract({
    address: token.address,
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [to, parseUnits(amount, token.decimals)],
  });
}

export function shortAddr(addr?: string): string {
  if (!addr) return "-";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
