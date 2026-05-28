"use client";

import { useState } from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BookOpenCheck, GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Step = {
  id: string;
  title: string;
  level: string;
  resources: number;
};

const initialSteps: Step[] = [
  { id: "beginner", title: "Syntax, OOP, core tooling", level: "Beginner", resources: 18 },
  { id: "intermediate", title: "APIs, testing, database work", level: "Intermediate", resources: 23 },
  { id: "advanced", title: "Architecture and scaling", level: "Advanced", resources: 16 },
  { id: "projects", title: "Portfolio grade projects", level: "Projects", resources: 9 },
  { id: "interview", title: "DSA and system design prep", level: "Interview Prep", resources: 31 },
  { id: "jobs", title: "Matched job openings", level: "Jobs", resources: 42 }
];

function SortableStep({ step }: { step: Step }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
      <button className="rounded p-1 text-white/45 hover:bg-white/10 hover:text-white" {...attributes} {...listeners} aria-label="Reorder step">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <p className="font-bold">{step.level}</p>
        <p className="text-sm text-white/55">{step.title}</p>
      </div>
      <span className="rounded bg-cyan/15 px-2 py-1 text-xs text-cyan">{step.resources} resources</span>
    </div>
  );
}

export function RoadmapStudio() {
  const [steps, setSteps] = useState(initialSteps);
  const [language, setLanguage] = useState("JavaScript");

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSteps((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[.72fr_1.28fr]">
      <section className="glass rounded-lg p-5">
        <div className="mb-5 flex items-center gap-3">
          <BookOpenCheck className="h-5 w-5 text-cyan" />
          <h2 className="text-xl font-black">Roadmap studio</h2>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm text-white/60">Language</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} className="h-11 w-full rounded-md border border-white/10 bg-panel px-3 outline-none">
            {["Java", "JavaScript", "Python", "React", "Node.js", "DevOps", "AI/ML", "Data Science", "Cyber Security", "Cloud Computing"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <Button className="w-full"><Plus className="h-4 w-4" /> Add nested step</Button>
        <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4 text-sm text-white/60">
          Jobs tagged with {language} are automatically connected to this roadmap path.
        </div>
      </section>
      <section className="glass rounded-lg p-5">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={steps.map((step) => step.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {steps.map((step) => <SortableStep key={step.id} step={step} />)}
            </div>
          </SortableContext>
        </DndContext>
      </section>
    </div>
  );
}
