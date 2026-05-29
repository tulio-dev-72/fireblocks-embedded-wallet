"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Login() {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="login-hero">
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
      <p className="foot-note">
        Powered by Dynamic, a Fireblocks company. Keys are generated and held by
        the user&rsquo;s MPC embedded wallet, this application never sees a
        private key.
      </p>
    </div>
  );
}
