# Meridian: Embedded Wallet (Fireblocks / Dynamic)

A real, deployable consumer-fintech demo: a user signs in with email and a
**non-custodial MPC embedded wallet** is provisioned for them in the background
(no seed phrase, no extension). They can view balances, receive (QR + address),
and send real transactions on **Polygon Amoy** testnet.

This is the **Embedded Wallets** pattern (Robinhood / Revolut / Stripe persona),
built on **Dynamic, a Fireblocks company**, which is Fireblocks' current
recommended path for new embedded-wallet builds.

- **Custody model:** non-custodial. Keys are generated and held by the user's
  MPC embedded wallet. This app never sees a private key.
- **Signing:** happens inside the Dynamic/Fireblocks MPC wallet via the viem
  `WalletClient` the SDK hands back.
- **No secrets in this codebase.** The only credential is the Dynamic
  *environment ID*, which is a public, client-side identifier by design.

---

## 1. Prerequisites

- Node.js 18.18+ (or 20+)
- A **Dynamic** account: https://app.dynamic.xyz
  (Your existing Fireblocks sandbox login is for the Fireblocks console, Dynamic
  is the wallet layer and has its own dashboard.)

## 2. Configure Dynamic (one-time, in the dashboard)

1. Create a project/environment. Copy the **Environment ID** from
   **Developers → SDK / API Keys**.
2. **Enable Embedded Wallets** (the MPC / Fireblocks-backed wallet type) under
   the wallets / embedded-wallet settings.
3. Turn on **"Create embedded wallet on sign up / on login"** so a wallet is
   auto-provisioned the first time a user signs in. (Without this, the app will
   sit on "Provisioning your embedded wallet…".)
4. Enable an auth method. **Email** is the simplest; social login also works.
5. Under **EVM networks**, make sure **Polygon Amoy (chainId 80002)** is enabled.
   The app also declares Amoy in code (`app/providers.tsx`) as a safeguard.
6. Add your local and production URLs (e.g. `http://localhost:3000` and your
   Vercel URL) to the **allowed origins / CORS** list.

## 3. Run locally

```bash
cp .env.local.example .env.local
# edit .env.local and paste your Environment ID
npm install
npm run dev
```

Open http://localhost:3000 → "Get started" → sign in with email → a wallet is
created → you land on the dashboard.

## 4. Get test funds

Send test **POL** to your wallet address (copy it from the dashboard or the
Receive screen) from the official Polygon faucet:
https://faucet.polygon.technology (select **Amoy**).

Once POL lands, hit **Refresh** on the dashboard, then try **Send** to another
address and watch the tx confirm on PolygonScan.

## 5. Add ERC-20 tokens (optional)

Native POL works out of the box. To show/send stablecoins or other ERC-20s,
open `lib/tokens.ts` and paste the token's **Amoy contract address** into the
matching entry (USDC, WETH, or add your own). Leaving an address blank simply
hides that token, nothing breaks.

## 6. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it in Vercel.
3. Add the env var **`NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID`** (and optionally
   `NEXT_PUBLIC_AMOY_RPC_URL`) in the Vercel project settings.
4. Add your Vercel domain to Dynamic's allowed origins (step 2.6).
5. Deploy.

---

## Project structure

```
app/
  layout.tsx        fonts + provider
  providers.tsx     DynamicContextProvider (env ID, Amoy network)
  page.tsx          login / dashboard / receive / send routing
  globals.css       styling
components/
  Login.tsx         email sign-in entry
  Dashboard.tsx     balances + actions
  Receive.tsx       QR + address
  Send.tsx          real transfer via the MPC signer
lib/
  chains.ts         Amoy config + read-only public client
  tokens.ts         token list + ERC-20 ABI
  wallet.ts         readBalance() and sendToken() helpers
```

## Notes for the portfolio story

- This demonstrates the **consumer/retail custody persona**, distinct from the
  institutional tokenization apps in the rest of the portfolio.
- It's built on the **current** Fireblocks-recommended embedded-wallet path
  (Dynamic), which signals you track where the platform is actually heading
  rather than the legacy EW SDK.
- The honest framing: non-custodial MPC, keys never touch the app server,
  signing happens in the wallet; that's the security story a Fireblocks
  audience cares about.

## Security

This app intentionally holds **no API secret, no private key, no signing
material**. The Dynamic environment ID is public by design. Never add a
Fireblocks API secret or any private key to this client app.
