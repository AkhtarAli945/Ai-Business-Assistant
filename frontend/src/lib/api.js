import { API_BASE_URL } from "../config.js";

const TOKEN_KEY = "vantra_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

/**
 * Authenticated fetch wrapper — attaches the JWT and parses JSON.
 * Pass `raw: true` in options to skip JSON parsing (e.g. file uploads with FormData).
 */
export async function apiFetch(path, { json, raw, headers, ...options } = {}) {
  const token = getToken();
  const finalHeaders = { ...headers };
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  let body = options.body;
  if (json !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers: finalHeaders, body });

  if (raw) return res;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}
