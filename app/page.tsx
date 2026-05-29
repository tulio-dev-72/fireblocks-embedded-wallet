"use client";

import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { type Address } from "viem";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import Receive from "@/components/Receive";
import Send from "@/components/Send";

type View = "dashboard" | "receive" | "send";

const ENV_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? "";

export default function Home() {
  const { user, primaryWallet, handleLogOut } = useDynamicContext();
  const [view, setView] = useState<View>("dashboard");

  // Guardrail: app won't work until the Dynamic env ID is set.
  if (!ENV_ID || ENV_ID === "replace-with-your-environment-id") {
    return (
      <div className="config-warn">
        <strong>Set your Dynamic environment ID.</strong>
        <br />
        Create a <code>.env.local</code> from <code>.env.local.example</code> and
        set <code>NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID</code> to the ID from your
        Dynamic dashboard (Developers → SDK / API Keys), then restart the dev
        server.
      </div>
    );
  }

  const TopBar = (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">M</div>
        <div className="brand-name">
          Meridian
        </div>
      </div>
      {user ? (
        <button className="back-btn" onClick={handleLogOut}>
          Sign out
        </button>
      ) : (
        <span className="net-chip">
          <span className="net-dot" /> Amoy
        </span>
      )}
    </div>
  );

  return (
    <main className="shell">
      {TopBar}

      {!user ? (
        <Login />
      ) : !primaryWallet?.address ? (
        <div className="center-state">
          <div>
            <div className="spinner" />
            Provisioning your embedded wallet…
            <br />
            <span style={{ fontSize: 12.5 }}>
              (If this hangs, enable auto-create embedded wallets in your Dynamic
              dashboard.)
            </span>
          </div>
        </div>
      ) : view === "receive" ? (
        <Receive
          address={primaryWallet.address}
          onBack={() => setView("dashboard")}
        />
      ) : view === "send" ? (
        <Send wallet={primaryWallet} onBack={() => setView("dashboard")} />
      ) : (
        <Dashboard
          address={primaryWallet.address as Address}
          onReceive={() => setView("receive")}
          onSend={() => setView("send")}
        />
      )}
    </main>
  );
}
