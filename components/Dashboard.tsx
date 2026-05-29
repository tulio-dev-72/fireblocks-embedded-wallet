"use client";

import { useCallback, useEffect, useState } from "react";
import { type Address } from "viem";
import { TOKENS } from "@/lib/tokens";
import { readBalance, shortAddr } from "@/lib/wallet";

type Props = {
  address: Address;
  onReceive: () => void;
  onSend: () => void;
};

export default function Dashboard({ address, onReceive, onSend }: Props) {
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const visibleTokens = TOKENS.filter((t) => !t.address || t.address.length > 0);

  const load = useCallback(async () => {
    setLoading(true);
    const next: Record<string, string> = {};
    await Promise.all(
      visibleTokens.map(async (t) => {
        try {
          next[t.symbol] = await readBalance(t, address);
        } catch {
          next[t.symbol] = "0";
        }
      })
    );
    setBalances(next);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    load();
  }, [load]);

  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const fmt = (v?: string) => {
    if (v === undefined) return "-";
    const n = Number(v);
    if (n === 0) return "0";
    return n < 0.0001 ? "<0.0001" : n.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  const pol = balances["POL"];

  return (
    <>
      <div className="card balance-card">
        <div className="balance-label">Total · POL balance</div>
        <div className="balance-amount">
          {loading ? "-" : fmt(pol)} <small>POL</small>
        </div>
        <div className="addr-row">
          <span className="addr-pill mono" onClick={copy}>
            {copied ? "Copied!" : shortAddr(address)}
          </span>
          <button className="refresh-link" onClick={load} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      <div className="actions">
        <button className="btn" onClick={onReceive}>
          Receive
        </button>
        <button className="btn" onClick={onSend}>
          Send
        </button>
      </div>

      <div className="section-label">Assets</div>
      {visibleTokens.map((t) => (
        <div className="token-row" key={t.symbol}>
          <div className="token-mark" style={{ background: t.accent }}>
            {t.symbol.slice(0, 3)}
          </div>
          <div className="token-meta">
            <div className="token-sym">{t.symbol}</div>
            <div className="token-name">{t.name}</div>
          </div>
          <div className="token-bal">{loading ? "…" : fmt(balances[t.symbol])}</div>
        </div>
      ))}
    </>
  );
}
