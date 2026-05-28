"use client";

import { useState } from "react";
import { BrainCircuit, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Analysis = {
  extractedSkills: string[];
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
};

export function ResumeAnalyzer() {
  const [text, setText] = useState("React Next.js TypeScript MongoDB Node.js Docker projects with measurable business impact.");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    const response = await fetch("/api/resume/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, fileUrl: "manual-entry", fileName: "profile-resume.txt" })
    });
    const data = await response.json().catch(() => null);
    setLoading(false);
    if (data?.resume) setAnalysis(data.resume);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="min-h-[34rem]">
        <div className="mb-4 flex items-center gap-3">
          <FileText className="h-5 w-5 text-cyan" />
          <h2 className="text-xl font-black">Resume viewer</h2>
        </div>
        <textarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-[24rem] w-full resize-none rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 outline-none focus:border-cyan" />
        <Button loading={loading} onClick={analyze} className="mt-4"><Sparkles className="h-4 w-4" /> Analyze resume</Button>
      </Card>
      <Card className="min-h-[34rem]">
        <div className="mb-4 flex items-center gap-3">
          <BrainCircuit className="h-5 w-5 text-mint" />
          <h2 className="text-xl font-black">AI match score</h2>
        </div>
        {analysis ? (
          <div className="space-y-5">
            <div className="rounded-lg border border-cyan/20 bg-cyan/10 p-5">
              <p className="text-sm text-white/60">ATS score</p>
              <p className="mt-2 text-6xl font-black text-cyan">{analysis.atsScore}</p>
            </div>
            <section>
              <h3 className="mb-2 font-bold">Extracted skills</h3>
              <div className="flex flex-wrap gap-2">{analysis.extractedSkills.map((skill) => <span key={skill} className="rounded bg-white/10 px-2 py-1 text-sm">{skill}</span>)}</div>
            </section>
            <section className="grid gap-3 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-bold text-mint">Strengths</h3>
                <ul className="space-y-2 text-sm text-white/65">{analysis.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-amber">Improve</h3>
                <ul className="space-y-2 text-sm text-white/65">{analysis.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex min-h-[24rem] items-center justify-center rounded-md border border-dashed border-white/10 text-center text-white/45">
            Analysis appears here after parsing.
          </div>
        )}
      </Card>
    </div>
  );
}
