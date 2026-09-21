// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await register(name, email, password);
//       navigate("/", { replace: true });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <AuthLayout
//       title="Create your account"
//       subtitle="Free to set up — connect your own Groq key and MongoDB cluster."
//       footer={
//         <p className="text-muted dark:text-night-muted">
//           Already have an account?{" "}
//           <Link to="/login" className="font-medium text-pine-600 hover:underline dark:text-pine-400">
//             Sign in
//           </Link>
//         </p>
//       }
//     >
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="text-sm font-medium text-ink dark:text-night-text">Full name</label>
//           <input
//             type="text"
//             required
//             autoComplete="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Akhtar Ali"
//             className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
//           />
//         </div>

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
//           <label className="text-sm font-medium text-ink dark:text-night-text">Password</label>
//           <input
//             type="password"
//             required
//             minLength={6}
//             autoComplete="new-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="At least 6 characters"
//             className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
//           />
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
//           {loading ? "Creating account…" : "Create account"}
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free to set up — connect your own Groq key and MongoDB cluster."
      footer={
        <p className="text-muted dark:text-night-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-pine-600 hover:underline dark:text-pine-400">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-ink dark:text-night-text">Full name</label>
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Akhtar Ali"
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
          />
        </div>

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
          <label className="text-sm font-medium text-ink dark:text-night-text">Password</label>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-pine-400 dark:border-night-border dark:bg-night-surface dark:text-night-text dark:placeholder:text-night-muted"
          />
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
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
