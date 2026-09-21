// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await login(email, password);
//       navigate(location.state?.from || "/", { replace: true });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <AuthLayout
//       title="Welcome back"
//       subtitle="Sign in to pick up where you left off."
//       footer={
//         <p className="text-muted dark:text-night-muted">
//           New to Vantra?{" "}
//           <Link to="/register" className="font-medium text-pine-600 hover:underline dark:text-pine-400">
//             Create an account
//           </Link>
//         </p>
//       }
//     >
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="text-sm font-medium text-ink dark:text-night-text">Email</label>
//           <input
//             type="email"
//             required
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@company.com"
//             className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
//           />
//         </div>

//         <div>
//           <div className="flex items-center justify-between">
//             <label className="text-sm font-medium text-ink dark:text-night-text">Password</label>
//           </div>
//           <div className="relative mt-1.5">
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 pr-11 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((v) => !v)}
//               className="absolute inset-y-0 right-0 flex items-center px-3 text-muted hover:text-ink dark:text-night-muted dark:hover:text-night-text"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               <EyeIcon open={showPassword} className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {error && (
//           <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-full bg-pine-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-600 disabled:opacity-50"
//         >
//           {loading ? "Signing in…" : "Sign in"}
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }

// function EyeIcon({ open, ...props }) {
//   return open ? (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
//       <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   ) : (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
//       <path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.4 5.3A10.6 10.6 0 0112 5c6.4 0 10 7 10 7a13.7 13.7 0 01-3.2 3.9M6.2 6.6C4 8.3 2 12 2 12s3.6 7 10 7c1.2 0 2.3-.2 3.3-.6" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }



import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <p className="text-muted dark:text-night-muted">
          New to Vantra?{" "}
          <Link to="/register" className="font-medium text-pine-600 hover:underline dark:text-pine-400">
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-ink dark:text-night-text">Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink dark:text-night-text">Password</label>
          </div>
          <div className="relative mt-1.5">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 pr-11 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-muted hover:text-ink dark:text-night-muted dark:hover:text-night-text"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} className="h-4 w-4" />
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-pine-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-600 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}

function EyeIcon({ open, ...props }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.4 5.3A10.6 10.6 0 0112 5c6.4 0 10 7 10 7a13.7 13.7 0 01-3.2 3.9M6.2 6.6C4 8.3 2 12 2 12s3.6 7 10 7c1.2 0 2.3-.2 3.3-.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
