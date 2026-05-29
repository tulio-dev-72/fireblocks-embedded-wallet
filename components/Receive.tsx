"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function Receive({
  address,
  onBack,
}: {
  address: string;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <>
      <div className="sheet-head">
        <h2 className="sheet-title">Receive</h2>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="card">
        <div className="qr-wrap">
          <div className="qr-frame">
            <QRCodeSVG value={address} size={196} bgColor="#f2efe6" fgColor="#0c0f0d" />
          </div>
          <p className="full-addr">{address}</p>
          <button className="btn btn-ghost" onClick={copy}>
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>
      </div>

      <p className="foot-note" style={{ textAlign: "center" }}>
        Send only Polygon Amoy (testnet) assets to this address. Need test POL?
        Use the official Polygon faucet.
      </p>
    </>
  );
}
