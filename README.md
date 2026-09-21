# Vantra — AI Business Assistant (Alci-style)

An enterprise AI assistant that answers questions from your company's internal documents (RAG),
summarizes meeting transcripts, and generates reports — built to showcase the same capabilities
as Astrik's **Alci** product.

**100% free stack** — no paid API keys required anywhere.

---

## Stack

| Layer | Tech | Cost |
|---|---|---|
| Frontend | React + Vite + Tailwind CSS | Free |
| Backend | Node.js + Express | Free |
| Database | MongoDB Atlas (free M0 cluster) | Free |
| LLM | Groq API (Llama 3.3 70B, free tier) | Free |
| Embeddings | `@xenova/transformers` (runs locally, no API key) | Free |
| Hosting | Vercel (frontend) + Render (backend) | Free tiers |

---

## 1. Prerequisites

- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster (M0 tier)
- A free [Groq API key](https://console.groq.com/keys)

---

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# open .env and paste your MONGODB_URI and GROQ_API_KEY
npm run dev
```

Backend runs on `http://localhost:5000`.

---

## 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`. It talks to the backend at `http://localhost:5000`
(configured in `frontend/src/config.js`).

---

## 4. What's included

- **Sign up / sign in** — real accounts (name, email, password), hashed with bcrypt, sessions
  via JWT. Every user's documents and chat history are private to their account.
- **Dark mode / light mode** — toggle in the header, remembers your choice, and respects your
  system preference on first visit.
- **Chat with your documents** — upload `.txt`/`.md` files, ask questions, get answers with
  source citations pulled from your own content via RAG.
- **Meeting Summarizer** — paste any transcript, get structured decisions / action items / key
  topics back, downloadable as Markdown.
- **Report Generator** — pick a focus + optional date range, get a synthesized report drawn from
  your uploaded documents and chat history.
- **Fully responsive UI** — split-screen auth pages, sidebar collapses into a bottom nav on
  mobile; every screen tested down to a 360px viewport.

Set `JWT_SECRET` in `backend/.env` to any long random string before running — this signs login
sessions. Nothing else to configure; sign-up creates the account and logs you straight in.

---

## 5. Deploying for free

- **Frontend** → push to GitHub, import into [Vercel](https://vercel.com), set the root
  directory to `frontend`.
- **Backend** → push to GitHub, import into [Render](https://render.com) as a Web Service, root
  directory `backend`, add your `MONGODB_URI` and `GROQ_API_KEY` as environment variables there.
- Update `frontend/src/config.js` to point `API_BASE_URL` at your deployed Render URL.

---

## 6. Project structure

```
ai-business-assistant/
├── PROMPT.md              ← full build prompt (for regenerating/extending with any AI tool)
├── backend/
│   ├── server.js
│   ├── routes/            (auth, chat, documents, reports, meetings)
│   ├── middleware/         (auth — verifies JWT on every protected route)
│   ├── services/          (embeddingService, ragService, llmService)
│   └── models/            (User, Document, ChatMessage)
└── frontend/
    └── src/
        ├── context/        (AuthContext, ThemeContext)
        ├── components/    (Sidebar, ChatWindow, MessageBubble, DocumentUpload, Header,
        │                    AuthLayout, ThemeToggle, ProtectedRoute)
        └── pages/          (Dashboard, Documents, Reports, Meetings, Login, Register)
```

---

## 7. Why this makes a strong portfolio piece for Astrik

- Mirrors **Alci** (business AI assistant) directly: RAG over company data + task automation
- Reuses the same proven pattern as the SupportAI project (Groq + local embeddings) —
  demonstrates a consistent, deliberate tech stack across a portfolio
- Multi-tenant-ready data model, source citations, and structured task outputs — signals
  "enterprise-ready," not just a chatbot demo
