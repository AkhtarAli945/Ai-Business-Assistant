import { useState } from "react";
import { authFetch } from "../config.js";

export default function Meetings() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function summarize(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary(null);
    try {
      const data = await authFetch("/api/meetings/summarize", {
        method: "POST",
        body: JSON.stringify({ transcript }),
      });
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadSummary() {
    if (!summary) return;
    const md = [
      "# Meeting Summary",
      "",
      "## Key Topics",
      ...summary.keyTopics.map((t) => `- ${t}`),
      "",
      "## Decisions",
      ...summary.decisions.map((d) => `- ${d}`),
      "",
      "## Action Items",
      ...summary.actionItems.map((a) => `- [ ] ${a.task} — **${a.owner}** (due ${a.dueDate})`),
    ].join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting-summary.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 md:px-0">
      <form onSubmit={summarize} className="rounded-2xl border border-border bg-surface p-5 shadow-soft dark:border-night-border dark:bg-night-surface">
        <label className="text-sm font-medium text-ink dark:text-night-text">Meeting transcript</label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={8}
          placeholder="Paste your meeting transcript here…"
          className="mt-2 w-full resize-none rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface2 dark:text-night-text dark:placeholder:text-night-muted"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted dark:text-night-muted">{transcript.length.toLocaleString()} characters</p>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-pine-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-600 disabled:opacity-50"
          >
            {loading ? "Summarizing…" : "Summarize meeting"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </form>

      {summary && (
        <div className="animate-fadeUp space-y-6 rounded-2xl border border-border bg-surface p-6 shadow-soft dark:border-night-border dark:bg-night-surface">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink dark:text-night-text">Summary</h2>
            <button
              onClick={downloadSummary}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-pine-400 hover:text-pine-700 dark:border-night-border dark:text-night-muted dark:hover:border-pine-400 dark:hover:text-pine-300"
            >
              <DownloadIcon className="h-3.5 w-3.5" /> Download .md
            </button>
          </div>

          <Section title="Key topics" items={summary.keyTopics} accent="bg-pine-500" />
          <Section title="Decisions" items={summary.decisions} accent="bg-amber-500" />

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-ink dark:text-night-text">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/60 dark:bg-night-muted" /> Action items
            </h3>
            <ul className="space-y-2">
              {summary.actionItems.map((a, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-paper px-4 py-3 text-sm dark:border-night-border dark:bg-night-surface2"
                >
                  <span className="text-ink dark:text-night-text">{a.task}</span>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                    {a.owner} · {a.dueDate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, items, accent }) {
  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-ink dark:text-night-text">
        <span className={`h-1.5 w-1.5 rounded-full ${accent}`} /> {title}
      </h3>
      <ul className="space-y-1.5 pl-3.5 text-sm text-ink/80 dark:text-night-text/80">
        {items.map((item, i) => (
          <li key={i} className="border-l border-border pl-3 leading-relaxed dark:border-night-border">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
