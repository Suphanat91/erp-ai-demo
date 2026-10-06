"use client";

import { useState } from "react";
import { Calendar, Users, Wallet, Layers, Brain, Smartphone, Cloud, HardDrive, Boxes } from "lucide-react";
import { PageHeader, StatCard, Badge, Progress, Tabs } from "@/components/ui";
import { projects, projectStatusLabel, thb, type ProjectStatus } from "@/lib/data";

const typeIcon = { ERP: Boxes, AI: Brain, Application: Smartphone, Cloud: Cloud, Hardware: HardDrive } as const;
const statusTone: Record<ProjectStatus, "slate" | "indigo" | "amber" | "sky" | "emerald"> = {
  planning: "slate", dev: "indigo", testing: "amber", deploy: "sky", done: "emerald",
};

const timeline = [
  { name: "ERP สยามรีเทล", start: 0, len: 9, color: "bg-indigo-500" },
  { name: "AI Vision", start: 1, len: 5, color: "bg-fuchsia-500" },
  { name: "Mobile App", start: 2, len: 3.5, color: "bg-sky-500" },
  { name: "Cloud Migration", start: 5, len: 6, color: "bg-cyan-500" },
  { name: "AI Chatbot", start: 4, len: 4.5, color: "bg-violet-500" },
  { name: "HR & Payroll", start: 5.5, len: 5, color: "bg-amber-500" },
];
const months = ["ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค."];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | string>("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.type === filter);
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <div>
      <PageHeader title="โครงการพัฒนาซอฟต์แวร์" subtitle="ติดตามโครงการ ERP, AI, Application, Cloud และงานติดตั้ง Hardware ในที่เดียว" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="โครงการทั้งหมด" value={`${projects.length}`} icon={Layers} tone="indigo" hint={`${projects.filter((p) => p.status === "done").length} เสร็จสิ้น`} />
        <StatCard label="มูลค่าสัญญารวม" value={thb(totalBudget)} icon={Wallet} tone="emerald" />
        <StatCard label="ต้นทุนใช้ไปแล้ว" value={thb(totalSpent)} icon={Wallet} tone="amber" hint={`${((totalSpent / totalBudget) * 100).toFixed(0)}% ของงบ`} />
        <StatCard label="ทีมงานในโครงการ" value={`${projects.reduce((s, p) => s + p.team, 0)} คน`} icon={Users} tone="sky" />
      </div>

      {/* Gantt / Timeline */}
      <div className="card p-5 mb-6 overflow-x-auto">
        <div className="font-semibold mb-4">Timeline โครงการ (Gantt)</div>
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[140px_1fr] text-[11px] text-slate-400 mb-2">
            <div />
            <div className="grid" style={{ gridTemplateColumns: `repeat(${months.length},1fr)` }}>
              {months.map((m) => <div key={m} className="border-l border-slate-100 pl-1">{m}</div>)}
            </div>
          </div>
          {timeline.map((t) => (
            <div key={t.name} className="grid grid-cols-[140px_1fr] items-center py-1.5">
              <div className="text-sm text-slate-600 truncate pr-2">{t.name}</div>
              <div className="relative h-6 rounded bg-slate-50">
                <div className={`absolute h-full rounded-md ${t.color} opacity-90`} style={{ left: `${(t.start / months.length) * 100}%`, width: `${(t.len / months.length) * 100}%` }} />
                <div className="absolute top-[-6px] bottom-[-6px] w-px bg-rose-500" style={{ left: `${(3.2 / months.length) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="text-[11px] text-rose-500 mt-2 pl-[140px]">│ วันนี้ (6 ต.ค.)</div>
        </div>
      </div>

      <div className="mb-4">
        <Tabs value={filter} onChange={setFilter} items={[{ key: "all", label: "ทั้งหมด" }, { key: "ERP", label: "ERP" }, { key: "AI", label: "AI" }, { key: "Application", label: "Application" }, { key: "Cloud", label: "Cloud" }, { key: "Hardware", label: "Hardware" }]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((p) => {
          const Icon = typeIcon[p.type as keyof typeof typeIcon];
          const burn = (p.spent / p.budget) * 100;
          const risk = burn - p.progress > 10;
          return (
            <div key={p.id} className="card p-5 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="grid place-items-center size-10 rounded-xl bg-indigo-50 text-indigo-600 shrink-0"><Icon size={20} /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.id} · {p.client}</div>
                </div>
                <Badge tone={statusTone[p.status]}>{projectStatusLabel[p.status]}</Badge>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">ความคืบหน้า · {p.sprint}</span><span className="font-medium">{p.progress}%</span></div>
                <Progress value={p.progress} tone={p.progress === 100 ? "emerald" : "indigo"} />
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">งบประมาณใช้ไป</span><span className="font-medium">{thb(p.spent)} / {thb(p.budget)}</span></div>
                <Progress value={burn} tone={risk ? "rose" : "emerald"} />
              </div>
              {risk && <div className="mt-3 text-xs rounded-lg bg-rose-50 text-rose-700 px-3 py-2">⚠ AI เตือน: อัตราใช้งบสูงกว่าความคืบหน้า {(burn - p.progress).toFixed(0)}%</div>}
              <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1"><Users size={14} /> PM: {p.pm} · {p.team} คน</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(p.due).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" })}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
