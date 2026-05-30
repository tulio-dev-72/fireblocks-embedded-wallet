"use client";

import { useState } from "react";
import { isAddress, type Address } from "viem";
import { TOKENS } from "@/lib/tokens";
import { sendToken, type DynamicWallet } from "@/lib/wallet";
import { explorerTxUrl } from "@/lib/chains";

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "ok"; hash: string }
  | { kind: "err"; message: string };

export default function Send({
  wallet,
  onBack,
}: {
  wallet: DynamicWallet | null;
  onBack: () => void;
}) {
  const sendable = TOKENS.filter((t) => !t.address || t.address.length > 0);
  const [symbol, setSymbol] = useState(sendable[0]?.symbol ?? "POL");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const token = sendable.find((t) => t.symbol === symbol)!;
  const validTo = isAddress(to);
  const validAmount = Number(amount) > 0;
  const canSend = validTo && validAmount && status.kind !== "pending";

  const submit = async () => {
    setStatus({ kind: "pending" });
    try {
      const hash = await sendToken(wallet, token, to as Address, amount);
      setStatus({ kind: "ok", hash });
      setTo("");
      setAmount("");
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Transaction failed. Please try again.";
      setStatus({ kind: "err", message });
    }
  };

  return (
    <>
      <div className="sheet-head">
        <h2 className="sheet-title">Send</h2>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="card">
        <div className="field">
          <label>Asset</label>
          <select
            className="select"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          >
            {sendable.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.symbol} · {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Recipient address</label>
          <input
            className="input"
            placeholder="0x…"
            value={to}
            onChange={(e) => setTo(e.target.value.trim())}
            spellCheck={false}
          />
        </div>

        <div className="field">
          <label>Amount ({symbol})</label>
          <input
            className="input"
            placeholder="0.00"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>

        <button className="btn btn-primary" onClick={submit} disabled={!canSend}>
          {status.kind === "pending" ? "Confirming…" : `Send ${symbol}`}
        </button>

        {to.length > 0 && !validTo && (
          <div className="status err">That doesn&rsquo;t look like a valid address.</div>
        )}
        {status.kind === "pending" && (
          <div className="status pending">
            Signing with your embedded wallet and broadcasting to Amoy…
          </div>
        )}
        {status.kind === "ok" && (
          <div className="status ok">
            Sent ✓{" "}
            <a href={explorerTxUrl(status.hash)} target="_blank" rel="noreferrer">
              View on PolygonScan
            </a>
          </div>
        )}
        {status.kind === "err" && <div className="status err">{status.message}</div>}
      </div>
    </>
  );
}
