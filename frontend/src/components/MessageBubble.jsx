import ReactMarkdown from "react-markdown";
import Logo from "./Logo.jsx";

export default function MessageBubble({ role, content, citations }) {
  const isUser = role === "user";
  return (
    <div className={`flex w-full items-start gap-3 animate-fadeUp ${isUser ? "flex-row-reverse" : ""}`}>
      <div className="mt-0.5 shrink-0">
        {isUser ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/90 text-xs font-medium text-white dark:bg-night-surface2 dark:text-night-text dark:ring-1 dark:ring-night-border">
            A
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pine-50 ring-1 ring-pine-100 dark:bg-night-surface2 dark:ring-night-border">
            <Logo className="h-4 w-4" />
          </div>
        )}
      </div>

      <div
        className={`max-w-[82%] md:max-w-[68%] px-4 py-3 text-[15px] leading-relaxed shadow-soft ${
          isUser
            ? "bg-pine-500 text-white rounded-2xl rounded-tr-sm"
            : "bg-surface border border-border rounded-2xl rounded-tl-sm dark:border-night-border dark:bg-night-surface2"
        }`}
      >
        <div className={isUser ? "prose-invert" : "prose prose-sm max-w-none"}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {!isUser && citations?.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-border pt-2.5 dark:border-night-border">
            {citations.map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-600 dark:bg-amber-400/10 dark:text-amber-400"
              >
                <SourceIcon className="h-3 w-3" />
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SourceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M7 3h7l4 4v14H7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
