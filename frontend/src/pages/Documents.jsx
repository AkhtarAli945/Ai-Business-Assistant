import { useEffect, useState } from "react";
import DocumentUpload from "../components/DocumentUpload.jsx";
import { authFetch } from "../config.js";

export default function Documents() {
  const [docs, setDocs] = useState([]);

  function loadDocs() {
    authFetch("/api/documents")
      .then((data) => Array.isArray(data) && setDocs(data))
      .catch(() => {});
  }

  useEffect(loadDocs, []);

  async function removeDoc(id) {
    await authFetch(`/api/documents/${id}`, { method: "DELETE" });
    loadDocs();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 md:px-0">
      <DocumentUpload onUploaded={loadDocs} />

      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg text-ink dark:text-night-text">Knowledge base</h2>
          <span className="text-xs text-muted dark:text-night-muted">
            {docs.length} document{docs.length === 1 ? "" : "s"}
          </span>
        </div>

        {docs.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-border bg-surface px-6 py-10 text-center dark:border-night-border dark:bg-night-surface">
            <p className="text-sm text-muted dark:text-night-muted">No documents yet — upload one above to get started.</p>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {docs.map((d, i) => (
              <div
                key={d._id}
                style={{ animationDelay: `${i * 40}ms` }}
                className="group flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-soft animate-fadeUp transition-colors hover:border-pine-200 dark:border-night-border dark:bg-night-surface dark:hover:border-pine-400/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-600 dark:bg-night-surface2 dark:text-pine-300">
                  <FileIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink dark:text-night-text">{d.fileName}</p>
                  <p className="text-xs text-muted dark:text-night-muted">Added {new Date(d.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => removeDoc(d._id)}
                  aria-label={`Remove ${d.fileName}`}
                  className="shrink-0 rounded-md p-1.5 text-muted opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:text-night-muted dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FileIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 3h7l4 4v14H7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 0v12a1 1 0 001 1h6a1 1 0 001-1V7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
