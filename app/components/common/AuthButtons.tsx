// components/common/AuthButtons.tsx
"use client";
import { useSession, signOut } from "next-auth/react";
import { Link, LogOut } from "lucide-react";
import link from "next/link";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // prevent flash

  return session ? (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 transition-colors font-medium"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  ) : (
    <Link href="/login">Login</Link>
  );
}
