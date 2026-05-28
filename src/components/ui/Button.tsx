"use client";

import { type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
};

export function Button({ className, variant = "primary", loading, children, disabled, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan",
        variant === "primary" && "bg-cyan text-slate-950 shadow-neon hover:bg-mint",
        variant === "ghost" && "border border-white/10 bg-white/5 text-white hover:bg-white/10",
        variant === "danger" && "bg-rose text-white hover:bg-rose/80",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
