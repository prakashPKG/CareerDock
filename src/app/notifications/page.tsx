import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";

const notifications = [
  ["New job match", "A Java backend role matched your profile at 91%."],
  ["Roadmap complete", "You completed Advanced React architecture."],
  ["Interview update", "Your HR interview has been scheduled."]
];

export default function NotificationsPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-4xl font-black">Notifications</h1>
        <div className="space-y-3">
          {notifications.map(([title, body]) => (
            <Card key={title} className="p-4">
              <h2 className="font-black">{title}</h2>
              <p className="mt-1 text-sm text-white/60">{body}</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
