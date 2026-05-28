import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";

const stages = ["Applied", "Under Review", "Interview", "Selected", "Rejected"];

export default function AppliedJobsPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-4xl font-black">Applied jobs</h1>
        <Card>
          <div className="grid gap-3 md:grid-cols-5">
            {stages.map((stage, index) => (
              <div key={stage} className={`rounded-md border p-4 ${index <= 2 ? "border-cyan/30 bg-cyan/10" : "border-white/10 bg-white/5"}`}>
                <p className="text-sm text-white/50">Stage {index + 1}</p>
                <h2 className="mt-1 font-black">{stage}</h2>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
