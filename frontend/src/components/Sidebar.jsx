import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Chat", icon: ChatIcon },
  { to: "/documents", label: "Documents", icon: DocIcon },
  { to: "/meetings", label: "Meetings", icon: MeetingIcon },
  { to: "/reports", label: "Reports", icon: ReportIcon },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const initial = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border bg-surface shrink-0 dark:border-night-border dark:bg-night-surface">
        <div className="px-6 py-6">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-xl tracking-tight text-ink dark:text-night-text">Vantra</span>
          </div>
          <p className="mt-1.5 text-xs text-muted dark:text-night-muted">Your team's business assistant</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-pine-50 text-pine-700 font-medium shadow-[inset_2px_0_0_0_theme(colors.pine.500)] dark:bg-night-surface2 dark:text-pine-200"
                    : "text-ink/65 hover:bg-paper hover:text-ink dark:text-night-muted dark:hover:bg-night-surface2 dark:hover:text-night-text"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl border border-border bg-paper px-3 py-3 dark:border-night-border dark:bg-night-surface2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine-500 text-sm font-medium text-white">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink dark:text-night-text">{user?.name}</p>
            <p className="truncate text-xs text-muted dark:text-night-muted">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="shrink-0 rounded-md p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:text-night-muted dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogoutIcon className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex md:hidden border-t border-border bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom,0px)] dark:border-night-border dark:bg-night-surface/95">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${
                isActive ? "text-pine-600 dark:text-pine-300" : "text-muted dark:text-night-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-7 w-9 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-pine-50 dark:bg-night-surface2" : ""
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 3.6A7.96 7.96 0 0 1 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DocIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M7 3h7l4 4v14H7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MeetingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
    </svg>
  );
}
function ReportIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <path d="M5 20V10M12 20V4M19 20v-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
