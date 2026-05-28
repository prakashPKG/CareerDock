"use client";

import { Bell } from "lucide-react";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";

export function NotificationBadge() {
  const unread = useRealtimeNotifications();
  return (
    <span className="relative">
      <Bell className="h-4 w-4" />
      {unread > 0 ? (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] font-black text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </span>
  );
}
