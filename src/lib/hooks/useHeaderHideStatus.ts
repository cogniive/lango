import { headers } from "next/headers";

export function getHeaderHideStatus() {
  const h = headers();
  const path = h.get("x-clerk-clerk-url") || ""; // Next.js includes full request URL here
  return path.includes("streak-challenge");
}