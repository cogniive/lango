import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { usePathname } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getWindow() {
  if (typeof window !== "undefined") return window;
}
export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;

  if (process.env.NEXT_PUBLIC_APP_URL)
    return `https://${process.env.NEXT_PUBLIC_APP_URL}${path}`;

  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}
