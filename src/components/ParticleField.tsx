"use client";

import { motion } from "framer-motion";

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 42 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-cyan/70"
          style={{ left: `${(index * 23) % 100}%`, top: `${(index * 37) % 100}%` }}
          animate={{ y: [0, -24, 0], opacity: [.25, 1, .25], scale: [1, 1.8, 1] }}
          transition={{ duration: 3 + (index % 5), repeat: Infinity, delay: index * .08 }}
        />
      ))}
    </div>
  );
}
