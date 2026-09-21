import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble.jsx";
import Logo from "./Logo.jsx";
import { authFetch } from "../config.js";

const SUGGESTIONS = [
  "Summarize what's in my uploaded documents",
  "What open items need my attention this week?",
  "Draft a status update from our latest notes",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    authFetch("/api/chat/history")
      .then((data) => Array.isArray(data) && setMessages(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e, override) {
    e?.preventDefault();
    const text = (override ?? input).trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const data = await authFetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply, citations: data.citations }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Something went wrong: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-4 md:px-0">
      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto py-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-dot-grid dark:bg-dot-grid-dark bg-surface/60 px-6 py-14 text-center animate-fadeUp dark:border-night-border dark:bg-night-surface/60">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pine-500 shadow-lift">
              <Logo className="h-8 w-8" />
            </div>
            <p className="mt-5 font-display text-2xl text-ink dark:text-night-text">Ask Vantra anything</p>
            <p className="mt-2 max-w-sm text-sm text-muted dark:text-night-muted">
              Upload documents in the Documents tab, then ask questions here. Every answer cites
              exactly where it came from.
            </p>

            <div className="mt-6 flex w-full max-w-md flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={(e) => sendMessage(e, s)}
                  className="rounded-full border border-border bg-surface px-4 py-2.5 text-left text-sm text-ink/80 transition-colors hover:border-pine-400 hover:bg-pine-50 hover:text-pine-700 dark:border-night-border dark:bg-night-surface2 dark:text-night-text/80 dark:hover:bg-night-surface dark:hover:text-pine-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} citations={m.citations} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 pl-11">
            <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft dark:border-night-border dark:bg-night-surface2">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pine-400 [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pine-400 [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pine-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="sticky bottom-0 border-t border-border bg-paper py-3 dark:border-night-border dark:bg-night-bg">
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1.5 shadow-soft focus-within:border-pine-400 dark:border-night-border dark:bg-night-surface2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your documents, deals, or tickets…"
            className="flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none dark:text-night-text dark:placeholder:text-night-muted"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine-500 text-white transition-transform hover:bg-pine-600 disabled:opacity-40 disabled:hover:bg-pine-500 active:scale-95"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
