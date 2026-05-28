import Link from "next/link";
import { Bookmark, BriefcaseBusiness, GraduationCap, LayoutDashboard, Map, PanelsTopLeft, UserRound } from "lucide-react";
import { NotificationBadge } from "@/components/NotificationBadge";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: PanelsTopLeft },
  { href: "/career-world", label: "World", icon: Map },
  { href: "/jobs", label: "Find Jobs", icon: BriefcaseBusiness },
  { href: "/applied-jobs", label: "Applied", icon: LayoutDashboard },
  { href: "/saved-jobs", label: "Saved", icon: Bookmark },
  { href: "/learning", label: "Learning", icon: GraduationCap },
  { href: "/profile", label: "Profile", icon: UserRound }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-void/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-black tracking-wide text-white">
            Career<span className="text-cyan">Dock</span>
          </Link>
          <div className="flex max-w-[calc(100vw-9rem)] items-center gap-1 overflow-x-auto rounded-md border border-white/10 bg-white/5 p-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="flex h-9 shrink-0 items-center gap-2 rounded px-3 text-sm text-white/70 hover:bg-white/10 hover:text-white">
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
            <Link href="/notifications" className="flex h-9 shrink-0 items-center gap-2 rounded px-3 text-sm text-white/70 hover:bg-white/10 hover:text-white">
              <NotificationBadge />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </div>
        </nav>
      </header>
      <main className="pt-16">{children}</main>
    </div>
  );
}
