"use client";

import { useState } from "react";
import { Plus, Sparkles, Target, Trophy, Users, Wallet } from "lucide-react";
import { PageHeader, StatCard, Badge, Modal, Field, Tabs, Toast } from "@/components/ui";
import { leads as initialLeads, stages, thb, type Lead, type LeadStage } from "@/lib/data";

const stageColor: Record<LeadStage, string> = {
  lead: "bg-slate-400", qualified: "bg-sky-500", proposal: "bg-indigo-500", negotiation: "bg-amber-500", won: "bg-emerald-500",
};

export default function CRM() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [view, setView] = useState<"board" | "list">("board");
  const [dragId, setDragId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ company: "", contact: "", interest: "ERP + On Cloud", value: "500000" });

  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2200); };

  const move = (id: string, stage: LeadStage) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage } : l)));
    const l = leads.find((x) => x.id === id);
    if (l && l.stage !== stage) notify(`ย้าย "${l.company}" ไปที่ ${stages.find((s) => s.key === stage)!.label}`);
  };

  const add = () => {
    if (!form.company) return;
    const n: Lead = {
      id: `L-${1011 + leads.length}`, company: form.company, contact: form.contact || "-", interest: form.interest,
      value: Number(form.value) || 0, stage: "lead", owner: "คุณ", aiScore: 40 + Math.floor(Math.random() * 50),
    };
    setLeads([n, ...leads]);
    setOpen(false);
    setForm({ company: "", contact: "", interest: "ERP + On Cloud", value: "500000" });
    notify(`เพิ่มลูกค้า ${n.company} แล้ว — AI ให้คะแนน ${n.aiScore}/100`);
  };

  const pipeline = leads.filter((l) => l.stage !== "won").reduce((s, l) => s + l.value, 0);
  const won = leads.filter((l) => l.stage === "won").reduce((s, l) => s + l.value, 0);
  const forecast = leads.filter((l) => l.stage !== "won").reduce((s, l) => s + (l.value * l.aiScore) / 100, 0);

  return (
    <div>
      <PageHeader
        title="CRM & การขาย"
        subtitle="จัดการลูกค้าเป้าหมาย ใบเสนอราคา และติดตามโอกาสการขาย — ลากการ์ดเพื่อเปลี่ยนสถานะ"
        actions={<button className="btn btn-primary" onClick={() => setOpen(true)}><Plus size={16} /> เพิ่มลูกค้าเป้าหมาย</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="มูลค่า Pipeline" value={thb(pipeline)} icon={Target} tone="indigo" delta={22} hint="เทียบไตรมาสก่อน" />
        <StatCard label="ปิดการขายแล้ว" value={thb(won)} icon={Trophy} tone="emerald" hint={`${leads.filter((l) => l.stage === "won").length} ดีล`} />
        <StatCard label="AI คาดการณ์ยอดปิด" value={thb(forecast)} icon={Sparkles} tone="fuchsia" hint="ถ่วงน้ำหนักด้วย AI Score" />
        <StatCard label="จำนวนลูกค้าเป้าหมาย" value={`${leads.length} ราย`} icon={Users} tone="sky" />
      </div>

      <div className="mb-4">
        <Tabs value={view} onChange={setView} items={[{ key: "board", label: "มุมมอง Kanban" }, { key: "list", label: "มุมมองตาราง" }]} />
      </div>

      {view === "board" ? (
        <div className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-4 overflow-x-auto pb-4">
          {stages.map((s) => {
            const items = leads.filter((l) => l.stage === s.key);
            return (
              <div
                key={s.key}
                className="rounded-2xl bg-slate-100/70 p-3 min-h-[400px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => dragId && move(dragId, s.key)}
              >
                <div className="flex items-center gap-2 px-1 mb-3">
                  <span className={`size-2.5 rounded-full ${stageColor[s.key]}`} />
                  <span className="font-medium text-sm">{s.label}</span>
                  <span className="text-xs text-slate-500">({items.length})</span>
                  <span className="ml-auto text-xs text-slate-500">{thb(items.reduce((a, b) => a + b.value, 0))}</span>
                </div>
                <div className="space-y-3">
                  {items.map((l) => (
                    <div
                      key={l.id}
                      draggable
                      onDragStart={() => setDragId(l.id)}
                      onDragEnd={() => setDragId(null)}
                      className={`card p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition ${dragId === l.id ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm">{l.company}</div>
                        <span className="text-[10px] text-slate-400">{l.id}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{l.contact} · ผู้ดูแล: {l.owner}</div>
                      <div className="mt-2"><Badge tone="indigo">{l.interest}</Badge></div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-semibold text-sm">{thb(l.value)}</span>
                        <span className={`text-xs inline-flex items-center gap-1 ${l.aiScore >= 80 ? "text-emerald-600" : l.aiScore >= 60 ? "text-amber-600" : "text-slate-500"}`}>
                          <Sparkles size={12} /> AI {l.aiScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-base">
            <thead><tr><th>รหัส</th><th>บริษัท</th><th>ผู้ติดต่อ</th><th>ความสนใจ</th><th>มูลค่า</th><th>สถานะ</th><th>AI Score</th><th>ผู้ดูแล</th></tr></thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="text-slate-500">{l.id}</td>
                  <td className="font-medium">{l.company}</td>
                  <td>{l.contact}</td>
                  <td><Badge tone="indigo">{l.interest}</Badge></td>
                  <td className="font-medium">{thb(l.value)}</td>
                  <td>
                    <select className="input py-1" value={l.stage} onChange={(e) => move(l.id, e.target.value as LeadStage)}>
                      {stages.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                  </td>
                  <td><Badge tone={l.aiScore >= 80 ? "emerald" : l.aiScore >= 60 ? "amber" : "slate"}>{l.aiScore}/100</Badge></td>
                  <td>{l.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="เพิ่มลูกค้าเป้าหมายใหม่">
        <div className="space-y-3">
          <Field label="ชื่อบริษัท / องค์กร *"><input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="เช่น บจ. ตัวอย่าง" /></Field>
          <Field label="ผู้ติดต่อ"><input className="input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="ชื่อผู้ติดต่อ" /></Field>
          <Field label="สนใจบริการ">
            <select className="input" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
              {["ERP + On Cloud", "พัฒนา Application", "AI Solution", "ซอฟต์แวร์สำเร็จรูป", "Hardware / Server", "Cloud Migration"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="มูลค่าโดยประมาณ (บาท)"><input type="number" className="input" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></Field>
          <div className="flex items-center gap-2 rounded-xl bg-fuchsia-50 text-fuchsia-700 text-xs p-3"><Wallet size={14} /> AI จะประเมินโอกาสปิดการขายให้อัตโนมัติ</div>
          <div className="flex justify-end gap-2 pt-2">
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>ยกเลิก</button>
            <button className="btn btn-primary" onClick={add}>บันทึก</button>
          </div>
        </div>
      </Modal>
      <Toast message={toast} />
    </div>
  );
}
