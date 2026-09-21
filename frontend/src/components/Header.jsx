import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const titles = {
  "/": ["Chat", "Ask questions answered from your company's documents"],
  "/documents": ["Documents", "Upload the internal knowledge Vantra should draw on"],
  "/meetings": ["Meeting summaries", "Turn a raw transcript into decisions and action items"],
  "/reports": ["Reports", "Generate a synthesized report from your documents"],
};

export default function Header() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [title, subtitle] = titles[pathname] || titles["/"];
  const initial = user?.name?.[0]?.toUpperCase() || "?";

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface/90 backdrop-blur px-5 py-4 md:px-8 dark:border-night-border dark:bg-night-surface/90">
      <div className="flex items-center gap-3">
        <span className="md:hidden">
          <Logo className="h-7 w-7" />
        </span>
        <div>
          <h1 className="font-display text-xl text-ink md:text-2xl dark:text-night-text">{title}</h1>
          <p className="text-sm text-muted dark:text-night-muted">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Mobile-only account menu (desktop shows account in Sidebar footer) */}
        <div className="relative md:hidden" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-500 text-sm font-medium text-white"
            aria-label="Account menu"
          >
            {initial}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-11 z-30 w-48 animate-popIn rounded-xl border border-border bg-surface p-2 shadow-lift dark:border-night-border dark:bg-night-surface2">
              <div className="px-2 py-1.5">
                <p className="truncate text-sm font-medium text-ink dark:text-night-text">{user?.name}</p>
                <p className="truncate text-xs text-muted dark:text-night-muted">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="mt-1 w-full rounded-lg px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
