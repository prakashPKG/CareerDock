"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricPoint } from "@/types";

const pie = [
  { name: "JavaScript", value: 32 },
  { name: "Python", value: 26 },
  { name: "Java", value: 18 },
  { name: "DevOps", value: 14 }
];

export function AdminCharts({ data }: { data: MetricPoint[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="glass rounded-lg p-4 lg:col-span-2">
        <h2 className="mb-4 text-sm font-semibold text-white/70">User Growth & Applications</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,.5)" />
              <YAxis stroke="rgba(255,255,255,.5)" />
              <Tooltip contentStyle={{ background: "#101624", border: "1px solid rgba(255,255,255,.12)" }} />
              <Area type="monotone" dataKey="users" stroke="#41E6FF" fill="rgba(65,230,255,.18)" />
              <Area type="monotone" dataKey="applications" stroke="#4DFFB5" fill="rgba(77,255,181,.14)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-lg p-4">
        <h2 className="mb-4 text-sm font-semibold text-white/70">Top Career Paths</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" outerRadius={92} fill="#41E6FF" label />
              <Tooltip contentStyle={{ background: "#101624", border: "1px solid rgba(255,255,255,.12)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-lg p-4 lg:col-span-3">
        <h2 className="mb-4 text-sm font-semibold text-white/70">Job Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,.5)" />
              <YAxis stroke="rgba(255,255,255,.5)" />
              <Tooltip contentStyle={{ background: "#101624", border: "1px solid rgba(255,255,255,.12)" }} />
              <Bar dataKey="jobs" fill="#FFCB6B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
