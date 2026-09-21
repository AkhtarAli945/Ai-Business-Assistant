import { useRef, useState } from "react";
import { authFetch } from "../config.js";

export default function DocumentUpload({ onUploaded }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await authFetch("/api/documents/upload", { method: "POST", body: formData });
      onUploaded?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      className={`rounded-2xl border-2 border-dashed bg-surface p-10 text-center transition-colors dark:bg-night-surface ${
        dragging ? "border-pine-400 bg-pine-50/50 dark:bg-night-surface2" : "border-border dark:border-night-border"
      }`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pine-50 dark:bg-night-surface2">
        <UploadIcon className="h-5 w-5 text-pine-600 dark:text-pine-300" />
      </div>
      <p className="mt-4 font-display text-lg text-ink dark:text-night-text">Add a document</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted dark:text-night-muted">
        Drag a .txt or .md file here, or browse — chunked and embedded locally, free.
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mt-5 rounded-full bg-pine-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-600 disabled:opacity-50"
      >
        {uploading ? "Uploading…" : "Browse files"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.md"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 16V4M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
