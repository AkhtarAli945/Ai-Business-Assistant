# PROMPT.md — Full Build Prompt for "Vantra" AI Business Assistant

Use this as a standalone prompt (feed it to Claude, GPT, or any AI coding tool) if you ever want
to regenerate, extend, or rebuild this project from scratch.

---

## The Prompt

> Build a full-stack, production-style **enterprise AI business assistant** web app called
> **Vantra**. It should work like Astrik's "Alci" product: an AI assistant that answers questions
> from a company's internal knowledge (uploaded documents), and automates two business tasks —
> **meeting summarization** and **report generation**.
>
> **Requirements:**
> 1. **Stack must be 100% free to run**: MERN (MongoDB Atlas free tier, Express, React, Node),
>    Groq API (free tier LLM — Llama 3.3 70B), and local embeddings via
>    `@xenova/transformers` (runs on-device, no API key, no cost). No paid vector DB — do
>    cosine-similarity search in JS against embeddings stored in MongoDB.
> 2. **RAG pipeline**: user uploads `.txt`/`.md`/`.pdf` docs → chunk (≈700 chars, 100 overlap) →
>    embed locally → store in MongoDB with tenant/user scoping → retrieve top-k relevant chunks
>    on each chat query → inject into the LLM prompt with citations.
> 3. **Chat interface**: a persistent sidebar (Chat / Documents / Reports), a main chat window
>    with streaming-style responses, source citations shown under each AI answer.
> 4. **Meeting Summarizer**: user pastes a transcript → backend calls the LLM with a structured
>    prompt → returns Decisions / Action Items (with owners) / Key Topics as structured JSON →
>    rendered as a clean card, downloadable as `.md`.
> 5. **Report Generator**: user picks a date range + focus area → backend synthesizes a report
>    from stored documents/chat history relevant to that range → rendered as a formatted report,
>    downloadable as `.md`.
> 6. **Fully responsive**: usable on mobile (sidebar collapses to a bottom/hamburger nav),
>    tablet, and desktop. No horizontal scrolling, touch-friendly tap targets.
> 7. **Multi-tenant-ready**: every document/message is scoped by a `userId` (simple auth is fine
>    for a portfolio build — expand to Clerk/JWT for production).
> 8. **Design**: do NOT use generic AI-SaaS defaults (cream+terracotta, purple gradient cards,
>    all-caps eyebrow labels). Use a deliberate, distinctive palette and a serif+sans type
>    pairing — see `frontend/src/index.css` for the token system already applied in this build.
> 9. **Auth**: real sign-up / sign-in with hashed passwords (bcrypt) and JWT sessions — every
>    user's documents and chat history are scoped to their account. No third-party auth
>    provider required, so the whole stack stays free.
> 10. **Dark mode**: a header toggle switching between a light and dark palette, persisted in
>    localStorage and defaulting to the visitor's system preference.
> 11. Ship as a monorepo with `/backend` and `/frontend`, each independently runnable, with a
>    root `README.md` explaining free-tier setup for MongoDB Atlas and Groq, `.env.example`
>    files, and clear npm scripts.

---

## Why this prompt is structured this way

- **Everything free** → Groq (free LLM tier) + `@xenova/transformers` (zero-cost local
  embeddings) + MongoDB Atlas free tier + Vercel/Render free hosting. No credit card required
  anywhere in the stack.
- **RAG + task automation, not just chat** → mirrors what an actual enterprise buyer (and Astrik)
  evaluates: can it *do* something with company data, not just answer trivia.
- **Explicit "avoid generic AI-SaaS look" instruction** → prevents the build from defaulting to
  templated purple-gradient-card design that every other bootcamp portfolio has.

You can reuse this prompt with any AI tool to regenerate this project, or hand pieces of it
(e.g., just section 4) to extend the app later.
