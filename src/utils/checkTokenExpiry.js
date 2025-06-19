// src/utils/checkTokenExpiry.js
import { jwtDecode } from "jwt-decode";

export function isTokenExpired() {
  const token = localStorage.getItem("token");
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    return true; // malformed or invalid token
  }
}
