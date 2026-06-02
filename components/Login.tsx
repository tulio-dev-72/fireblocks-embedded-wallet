"use client";

import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Login() {
  const { setShowAuthFlow } = useDynamicContext();
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div className="login-hero">
      <span className="demo-strip">
        Portfolio demo · Fireblocks embedded wallets via Dynamic · Polygon Amoy testnet
      </span>
      <span className="eyebrow">Meridian · Wallet</span>
      <h1 className="headline">
        Money that moves <em>onchain</em>, without the crypto homework.
      </h1>
      <p className="subcopy">
        Sign in with your email and a secure, non-custodial wallet is created
        for you in the background, no seed phrase, no browser extension, no
        chain switching.
      </p>
      <ul className="login-points">
        <li>Self-custody keys via Fireblocks / Dynamic MPC, you own the assets, we never do.</li>
        <li>Built on Polygon Amoy testnet for safe, real onchain transactions.</li>
        <li>Send, receive, and hold POL and stablecoins from one place.</li>
      </ul>
      <div className="login-cta">
        <button className="btn btn-primary" onClick={() => setShowAuthFlow(true)}>
          Get started
        </button>
      </div>

      <button
        type="button"
        className="compare-toggle"
        onClick={() => setShowCompare((v) => !v)}
        aria-expanded={showCompare}
      >
        How this compares <span className="compare-caret">{showCompare ? "−" : "+"}</span>
      </button>
      {showCompare && (
        <div className="compare-panel">
          <div className="compare-row">
            <span className="compare-vs">vs. custodial (Coinbase-style)</span>
            <span className="compare-text">
              The user actually self-custodies, so the app carries no custody
              liability.
            </span>
          </div>
          <div className="compare-row">
            <span className="compare-vs">vs. seed-phrase self-custody (MetaMask)</span>
            <span className="compare-text">
              Email login, no seed phrase, no extension. Removes the #1
              onboarding drop-off.
            </span>
          </div>
          <div className="compare-row">
            <span className="compare-vs">vs. other embedded-wallet SDKs</span>
            <span className="compare-text">
              MPC key sharding, no single point of compromise, plus a path into
              the rest of the Fireblocks platform as the app scales.
            </span>
          </div>
          <div className="compare-row">
            <span className="compare-vs">vs. Fireblocks retail-demo (custodial)</span>
            <span className="compare-text">
              Fireblocks&rsquo; official{" "}
              <a
                href="https://github.com/fireblocks/retail-demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                retail-demo
              </a>{" "}
              shows the custodial omnibus pattern (backend holds the API key,
              user balances pooled in vault accounts). This is the non-custodial
              counterpart, the user holds the keys.
            </span>
          </div>
        </div>
      )}

      <p className="foot-note">
        Powered by Dynamic, a Fireblocks company. Keys are generated and held by
        the user&rsquo;s MPC embedded wallet, this application never sees a
        private key.
      </p>
    </div>
  );
}
