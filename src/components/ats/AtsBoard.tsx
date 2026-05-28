"use client";

import { useMemo, useState } from "react";
import { DndContext, type DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CalendarClock, FileText, GripVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ApplicationStage } from "@/types";

const columns: { id: ApplicationStage; label: string }[] = [
  { id: "APPLIED", label: "Applied" },
  { id: "SCREENING", label: "Screening" },
  { id: "INTERVIEWING", label: "Interviewing" },
  { id: "OFFERED", label: "Offered" },
  { id: "REJECTED", label: "Rejected" }
];

export type AtsApplicant = {
  id: string;
  name: string;
  role: string;
  stage: ApplicationStage;
  matchScore: number;
  skills: string[];
};

function DropColumn({ id, label, children }: { id: ApplicationStage; label: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section ref={setNodeRef} className={`min-h-[30rem] rounded-lg border p-3 transition ${isOver ? "border-cyan bg-cyan/10" : "border-white/10 bg-white/5"}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-wide text-white/70">{label}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function ApplicantCard({ applicant }: { applicant: AtsApplicant }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: applicant.id,
    data: { stage: applicant.stage }
  });
  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`rounded-md border border-white/10 bg-panel p-4 shadow-xl ${isDragging ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold">{applicant.name}</h3>
          <p className="mt-1 text-sm text-white/50">{applicant.role}</p>
        </div>
        <button className="rounded p-1 text-white/45 hover:bg-white/10 hover:text-white" {...listeners} {...attributes} aria-label="Drag applicant">
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="rounded bg-mint px-2 py-1 text-xs font-black text-slate-950">{applicant.matchScore}% match</span>
        <span className="flex items-center gap-1 text-xs text-amber"><Star className="h-3 w-3" /> 4.5</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {applicant.skills.map((skill) => <span key={skill} className="rounded bg-white/10 px-2 py-1 text-[11px] text-white/65">{skill}</span>)}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="ghost" className="h-9 px-2 text-xs"><FileText className="h-3 w-3" /> Resume</Button>
        <Button variant="ghost" className="h-9 px-2 text-xs"><CalendarClock className="h-3 w-3" /> Schedule</Button>
      </div>
    </article>
  );
}

export function AtsBoard({ applicants }: { applicants: AtsApplicant[] }) {
  const [items, setItems] = useState(applicants);

  const grouped = useMemo(() => {
    return columns.reduce<Record<ApplicationStage, AtsApplicant[]>>((acc, column) => {
      acc[column.id] = items.filter((item) => item.stage === column.id);
      return acc;
    }, {} as Record<ApplicationStage, AtsApplicant[]>);
  }, [items]);

  async function onDragEnd(event: DragEndEvent) {
    const over = event.over?.id as ApplicationStage | undefined;
    const id = String(event.active.id);
    if (!over || !columns.some((column) => column.id === over)) return;
    setItems((current) => current.map((item) => item.id === id ? { ...item, stage: over } : item));
    await fetch("/api/ats", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: id, stage: over })
    }).catch(() => null);
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid gap-4 xl:grid-cols-5">
        {columns.map((column) => (
          <DropColumn key={column.id} id={column.id} label={column.label}>
            {grouped[column.id].map((applicant) => <ApplicantCard key={applicant.id} applicant={applicant} />)}
          </DropColumn>
        ))}
      </div>
    </DndContext>
  );
}
