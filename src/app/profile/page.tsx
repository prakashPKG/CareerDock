import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { ResumeAnalyzer } from "@/components/profile/ResumeAnalyzer";

export default function ProfilePage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[.24em] text-cyan">Profile</p>
          <h1 className="mt-2 text-4xl font-black">AI career profile</h1>
        </div>
        <div className="mb-6 grid gap-4 lg:grid-cols-4">
          {["Resume Analysis", "ATS Score", "Skill Gap", "Recommended Jobs"].map((item, index) => (
            <Card key={item}>
              <p className="text-sm text-white/50">{item}</p>
              <p className="mt-2 text-3xl font-black">{[88, 76, 12, 24][index]}</p>
            </Card>
          ))}
        </div>
        <ResumeAnalyzer />
      </section>
    </AppShell>
  );
}
