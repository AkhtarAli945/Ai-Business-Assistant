import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen w-full bg-paper dark:bg-night-bg">
      {/* Branding panel — hidden on small screens */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-pine-700 p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-dot-grid bg-dot-grid opacity-[0.08]" />
        <div className="relative flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="font-display text-2xl">Vantra</span>
        </div>

        <div className="relative max-w-sm">
          <p className="font-display text-3xl leading-snug">
            One assistant for everything your team already knows.
          </p>
          <p className="mt-4 text-sm text-pine-100/80">
            Chat with your documents, summarize meetings, and generate reports — all answers
            cited back to your own data.
          </p>
        </div>

        <p className="relative text-xs text-pine-100/60">© {new Date().getFullYear()} Vantra</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between px-6 py-5 lg:justify-end">
          <div className="flex items-center gap-2 lg:hidden">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg text-ink dark:text-night-text">Vantra</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-sm animate-fadeUp">
            <h1 className="font-display text-2xl text-ink dark:text-night-text">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-muted dark:text-night-muted">{subtitle}</p>}

            <div className="mt-7">{children}</div>

            {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
