// import { createContext, useContext, useEffect, useState } from "react";
// import { authFetch, getToken, setToken, clearToken } from "../config.js";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     authFetch("/api/auth/me")
//       .then((data) => setUser(data.user))
//       .catch(() => clearToken())
//       .finally(() => setLoading(false));
//   }, []);

//   async function login(email, password) {
//     const data = await authFetch("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     });
//     setToken(data.token);
//     setUser(data.user);
//   }

//   async function register(name, email, password) {
//     const data = await authFetch("/api/auth/register", {
//       method: "POST",
//       body: JSON.stringify({ name, email, password }),
//     });
//     setToken(data.token);
//     setUser(data.user);
//   }

//   function logout() {
//     clearToken();
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }



import { createContext, useContext, useEffect, useState } from "react";
import { authFetch, getToken, setToken, clearToken } from "../config.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    authFetch("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await authFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
  }

  async function register(name, email, password) {
    // Intentionally does NOT store a token/user here — registration should not
    // auto-login. The user is sent to /login to sign in with their new credentials.
    await authFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
