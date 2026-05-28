import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";

export default function SavedJobsPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-4xl font-black">Saved jobs</h1>
        <Card>
          <p className="text-white/60">Saved jobs will appear here with match score, deadline, and quick apply actions.</p>
        </Card>
      </section>
    </AppShell>
  );
}
