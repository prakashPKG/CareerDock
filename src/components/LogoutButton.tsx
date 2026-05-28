"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex h-9 shrink-0 items-center gap-2 rounded px-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden lg:inline">Logout</span>
    </button>
  );
}
