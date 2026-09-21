import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { authFetch } from "../config.js";

export default function Reports() {
  const [focus, setFocus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await authFetch("/api/reports/generate", {
        method: "POST",
        body: JSON.stringify({ focus, dateFrom, dateTo }),
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadReport() {
    if (!result) return;
    const blob = new Blob([result.report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 md:px-0">
      <form onSubmit={generate} className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-soft dark:border-night-border dark:bg-night-surface">
        <div>
          <label className="text-sm font-medium text-ink dark:text-night-text">Focus area</label>
          <input
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="e.g. Open deals with enterprise clients"
            required
            className="mt-1.5 w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm focus:border-pine-400 dark:border-night-border dark:bg-night-surface2 dark:text-night-text dark:placeholder:text-night-muted"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-ink dark:text-night-text">From <span className="text-muted dark:text-night-muted">(optional)</span></label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3 py-2.5 text-sm focus:border-pine-400 dark:border-night-border dark:bg-night-surface2 dark:text-night-text"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink dark:text-night-text">To <span className="text-muted dark:text-night-muted">(optional)</span></label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3 py-2.5 text-sm focus:border-pine-400 dark:border-night-border dark:bg-night-surface2 dark:text-night-text"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : <span />}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-pine-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-600 disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate report"}
          </button>
        </div>
      </form>

      {result && (
        <div className="animate-fadeUp rounded-2xl border border-border bg-surface p-6 shadow-soft dark:border-night-border dark:bg-night-surface">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4 dark:border-night-border">
            <h2 className="font-display text-lg text-ink dark:text-night-text">Report</h2>
            <button
              onClick={downloadReport}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-pine-400 hover:text-pine-700 dark:border-night-border dark:text-night-muted dark:hover:border-pine-400 dark:hover:text-pine-300"
            >
              <DownloadIcon className="h-3.5 w-3.5" /> Download .md
            </button>
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{result.report}</ReactMarkdown>
          </div>
          {result.sources?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4 dark:border-night-border">
              {result.sources.map((s, i) => (
                <span key={i} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
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
