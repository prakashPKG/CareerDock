import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";

const tracks = ["Java", "JavaScript", "Python", "React", "Node.js", "DevOps", "AI/ML", "Data Science", "Cyber Security", "Cloud Computing"];

export default function LearningPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[.24em] text-cyan">Learning</p>
          <h1 className="mt-2 text-4xl font-black">Roadmap paths</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {tracks.map((track) => (
            <Card key={track} className="p-4">
              <h2 className="font-black">{track}</h2>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-cyan" />
              </div>
              <p className="mt-3 text-sm text-white/50">Beginner to jobs</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
