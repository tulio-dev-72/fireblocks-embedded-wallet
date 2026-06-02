import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Meridian · Embedded Wallet",
  description:
    "Non-custodial embedded wallet powered by Fireblocks / Dynamic, on Polygon Amoy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable}`}
      >
        <div className="device-stage">
          <div className="device">
            <div className="device-island" aria-hidden />
            <div className="device-screen">
              <Providers>{children}</Providers>
            </div>
            <div className="device-home" aria-hidden />
          </div>
        </div>
      </body>
    </html>
  );
}
