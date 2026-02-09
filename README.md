# Pratik Hingorani's Portfolio

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              Cloudflare Pages                                       │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                              Next.js App                                      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────────────────────┐  │  │
│  │  │  /about  │  │ /contact │  │  /chat   │  │    API Routes (Server)        │  │  │
│  │  │ (Static) │  │ (Static) │  │ (SSR/ISR)│  │   • /api/chat (vLLM)          │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  │   • /api/contact              │  │  │
│  │                                              │   • /api/extract-text         │  │  │
│  │                                              └───────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                               │
│                                      │ HTTPS (Encrypted)                             │
│                                      ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                        Cloudflare Tunnel (cloudflared)                        │  │
│  │                         (Reverse Proxy - No Public IP)                        │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                      │                                               │
│                                      │ Secure Tunnel Connection                      │
│                                      ▼                                               │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                         Your DGX Spark Machine                                │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │              vLLM (OpenAI-compatible API)                               │  │  │
│  │  │              Port: 8000 (or 11434)                                      │  │  │
│  │  │                                                                         │  │  │
│  │  │              ✓ No Ollama                                                │  │  │
│  │  │              ✓ Only vLLM                                                │  │  │
│  │  │              ✓ Model: gpt-oss:120b                                      │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────┐
│  Data Flow:                                                                         │
│  1. User visits site → Cloudflare Pages serves static HTML                          │
│  2. User submits chat → Next.js API route (/api/chat)                               │
│  3. API route authenticates → Cloudflare Tunnel → DGX Spark                         │
│  4. vLLM processes request → returns response through tunnel → API route            │
│  5. Streamed response to user (no credentials exposed to browser)                   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Pages

1. Connect your GitHub repo in Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Add environment variables (see `.env.example`)
5. Setup Cloudflare Tunnel for DGX Spark access (see `CLOUDFLARE_TUNNEL_SETUP.md`)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
