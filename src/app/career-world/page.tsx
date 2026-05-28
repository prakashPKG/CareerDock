"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Layers3, Moon, Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CareerWorld } from "@/components/three/CareerWorld";
import { Button } from "@/components/ui/Button";

const paths = ["Java", "JavaScript", "Python", "AI", "DevOps"];

export default function CareerWorldPage() {
  return (
    <AppShell>
      <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
        <CareerWorld />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass pointer-events-auto absolute left-4 top-4 max-w-md rounded-lg p-5">
          <p className="text-sm uppercase tracking-[.2em] text-cyan">3D career world</p>
          <h1 className="mt-2 text-3xl font-black">Choose a road and unlock the next skill zone</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {paths.map((path) => <span key={path} className="rounded bg-white/10 px-2 py-1 text-sm text-white/70">{path}</span>)}
          </div>
          <Link href="/learning"><Button className="mt-5"><Compass className="h-4 w-4" /> Open roadmap</Button></Link>
        </motion.div>
        <div className="glass pointer-events-auto absolute bottom-4 left-4 right-4 grid gap-3 rounded-lg p-3 md:left-auto md:w-[28rem] md:grid-cols-3">
          {[
            { label: "Mini Map", value: "5 roads", icon: Layers3 },
            { label: "Cycle", value: "Night", icon: Moon },
            { label: "XP", value: "8,420", icon: Trophy }
          ].map((item) => (
            <div key={item.label} className="rounded-md bg-white/5 p-3">
              <item.icon className="h-4 w-4 text-cyan" />
              <p className="mt-2 text-xs text-white/45">{item.label}</p>
              <p className="font-black">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
