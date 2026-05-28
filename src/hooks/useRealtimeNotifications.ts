"use client";

import { useEffect, useState } from "react";

export function useRealtimeNotifications() {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let active = true;

    async function tick() {
      try {
        const response = await fetch("/api/notifications", { cache: "no-store" });
        if (!response.ok || !active) return;
        const data = await response.json();
        setUnread(data.unread ?? 0);
      } catch {
        setUnread(0);
      }
    }

    tick();
    const interval = window.setInterval(tick, 15000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return unread;
}
