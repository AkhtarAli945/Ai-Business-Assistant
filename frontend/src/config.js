// // export const API_BASE_URL = "http://localhost:5000";

// // const TOKEN_KEY = "vantra_token";

// // export function getToken() {
// //   return localStorage.getItem(TOKEN_KEY);
// // }
// // export function setToken(token) {
// //   localStorage.setItem(TOKEN_KEY, token);
// // }
// // export function clearToken() {
// //   localStorage.removeItem(TOKEN_KEY);
// // }

// // // fetch wrapper that attaches the auth token and parses JSON errors consistently
// // export async function authFetch(path, options = {}) {
// //   const token = getToken();
// //   const headers = { ...(options.headers || {}) };
// //   if (token) headers.Authorization = `Bearer ${token}`;
// //   if (!(options.body instanceof FormData) && options.body && !headers["Content-Type"]) {
// //     headers["Content-Type"] = "application/json";
// //   }

// //   const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
// //   const data = await res.json().catch(() => ({}));
// //   if (!res.ok) {
// //     throw new Error(data.error || "Something went wrong. Please try again.");
// //   }
// //   return data;
// // }









// // export const API_BASE_URL = "http://localhost:5000";

// // const TOKEN_KEY = "vantra_token";

// // export function getToken() {
// //   return localStorage.getItem(TOKEN_KEY);
// // }
// // export function setToken(token) {
// //   localStorage.setItem(TOKEN_KEY, token);
// // }
// // export function clearToken() {
// //   localStorage.removeItem(TOKEN_KEY);
// // }

// // // fetch wrapper that attaches the auth token and parses JSON errors consistently
// // export async function authFetch(path, options = {}) {
// //   const token = getToken();
// //   const headers = { ...(options.headers || {}) };
// //   if (token) headers.Authorization = `Bearer ${token}`;
// //   if (!(options.body instanceof FormData) && options.body && !headers["Content-Type"]) {
// //     headers["Content-Type"] = "application/json";
// //   }

// //   const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
// //   const data = await res.json().catch(() => ({}));
// //   if (!res.ok) {
// //     throw new Error(data.error || "Something went wrong. Please try again.");
// //   }
// //   return data;
// // }





// export const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000";

// const TOKEN_KEY = "vantra_token";

// export function getToken() {
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function setToken(token) {
//   localStorage.setItem(TOKEN_KEY, token);
// }

// export function clearToken() {
//   localStorage.removeItem(TOKEN_KEY);
// }

// // fetch wrapper that attaches the auth token and parses JSON errors consistently
// export async function authFetch(path, options = {}) {
//   const token = getToken();

//   const headers = { ...(options.headers || {}) };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   if (
//     !(options.body instanceof FormData) &&
//     options.body &&
//     !headers["Content-Type"]
//   ) {
//     headers["Content-Type"] = "application/json";
//   }

//   const res = await fetch(`${API_BASE_URL}${path}`, {
//     ...options,
//     headers,
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(
//       data.error || "Something went wrong. Please try again."
//     );
//   }

//   return data;
// }





export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const TOKEN_KEY = "vantra_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// fetch wrapper that attaches the auth token and parses JSON errors consistently
export async function authFetch(path, options = {}) {
  const token = getToken();

  const headers = { ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (
    !(options.body instanceof FormData) &&
    options.body &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.error || "Something went wrong. Please try again."
    );
  }

  return data;
}