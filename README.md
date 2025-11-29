
# LOCKED IN — React Website (Ready to deploy)

This ZIP contains a minimal React project for the LOCKED IN clothing store. It includes:
- Shop page
- Checkout with Paystack & Flutterwave client-side integrations (test/public keys wired as placeholders)
- Order success page
- Product catalog (JSON)
- Routing via react-router-dom

IMPORTANT: Replace the placeholder API keys with your real keys in `.env` or the indicated files before accepting real payments. Also add your real product images into `public/assets/products/` and your logo at `public/assets/logo.png`.

How to run (on a laptop / desktop; not required for Vercel):
1. `npm install`
2. `npm start`
3. Project runs at http://localhost:3000

Deployment:
- Connect this repo to Vercel (or Netlify). Vercel auto-detects React and will deploy.
- Set environment variables in Vercel dashboard:
  - REACT_APP_PAYSTACK_KEY (Paystack public key)
  - REACT_APP_FLW_KEY (Flutterwave public key)

Notes:
- This project uses client-side payment popups. For production, implement webhook verification server-side (examples included as commented code in README).
- Replace bank details in `src/components/ManualBankDetails.jsx`.

