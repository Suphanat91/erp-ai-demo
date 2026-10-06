"use client";

import { useState } from "react";
import { LifeBuoy, Timer, Smile, Flame, Sparkles } from "lucide-react";
import { PageHeader, StatCard, Badge, Toast } from "@/components/ui";
import { tickets as initial, type TicketPriority } from "@/lib/data";

const pTone: Record<TicketPriority, "rose" | "amber" | "sky" | "slate"> = { critical: "rose", high: "amber", medium: "sky", low: "slate" };
const pLabel: Record<TicketPriority, string> = { critical: "วิกฤต", high: "สูง", medium: "กลาง", low: "ต่ำ" };
const sLabel: Record<string, string> = { open: "เปิด", "in-progress": "กำลังดำเนินการ", resolved: "แก้ไขแล้ว" };

const aiSuggest: Record<string, string> = {
  "TK-3381": "ตรวจพบ GPU utilization 91% บน ai-inference-gpu — แนะนำ scale-out เพิ่ม 1 node อัตโนมัติ และเปิด batch inference",
  "TK-3379": "พบ 37 รายการขายที่ sync ไม่สำเร็จเมื่อ 03:12 น. — แนะนำรัน job 'stock-reconcile' ใหม่",
  "TK-3376": "คาดว่าพื้นที่จะเต็มภายใน 9 วัน — เสนอขายแพ็กเกจ Cloud Backup เพิ่ม 2TB (฿2,400/เดือน)",
  "TK-3372": "ลูกค้ามีสิทธิ์ตามสัญญา — เพิ่มผู้ใช้ได้ทันทีและออกใบแจ้งหนี้ส่วนต่าง ฿2,670/เดือน",
  "TK-3368": "อาการคล้ายเคส TK-2984 (ไดรเวอร์ USB) — ส่งคู่มือแก้ไขเบื้องต้นให้ลูกค้า ก่อนส่งช่างเข้าหน้างาน",
  "TK-3360": "เป็น Change Request — แนะนำแปลงเป็นใบเสนอราคา 2 Man-day",
};

export default function Support() {
  const [tickets, setTickets] = useState(initial);
  const [sel, setSel] = useState(initial[0].id);
  const [toast, setToast] = useState<string | null>(null);
  const t = tickets.find((x) => x.id === sel)!;

  const resolve = () => {
    setTickets((ts) => ts.map((x) => (x.id === sel ? { ...x, status: "resolved" } : x)));
    setToast(`ปิด Ticket ${sel} แล้ว`); setTimeout(() => setToast(null), 1800);
  };

  return (
    <div>
      <PageHeader title="Helpdesk / Support" subtitle="รับแจ้งปัญหาจากทุกช่องทาง (Hotline, Email, LINE OA, Monitoring) พร้อม AI ช่วยวิเคราะห์" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Ticket ที่เปิดอยู่" value={`${tickets.filter((x) => x.status !== "resolved").length}`} icon={LifeBuoy} tone="indigo" />
        <StatCard label="เวลาตอบกลับเฉลี่ย" value="18 นาที" icon={Timer} tone="sky" delta={-22} hint="เร็วขึ้น" />
        <StatCard label="ความพึงพอใจ (CSAT)" value="4.8 / 5" icon={Smile} tone="emerald" />
        <StatCard label="เคสวิกฤต" value={`${tickets.filter((x) => x.priority === "critical" && x.status !== "resolved").length}`} icon={Flame} tone="rose" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="card xl:col-span-3 divide-y divide-slate-100">
          {tickets.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)} className={`w-full text-left p-4 flex gap-3 items-start transition cursor-pointer ${sel === x.id ? "bg-indigo-50/60" : "hover:bg-slate-50"}`}>
              <Badge tone={pTone[x.priority]}>{pLabel[x.priority]}</Badge>
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${x.status === "resolved" ? "line-through text-slate-400" : ""}`}>{x.subject}</div>
                <div className="text-xs text-slate-500">{x.id} · {x.client} · ผ่าน {x.channel}</div>
              </div>
              <div className="text-right text-xs shrink-0">
                <div className="text-slate-600">{sLabel[x.status]}</div>
                <div className="text-slate-400">SLA {x.sla}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="card p-5 xl:col-span-2 h-fit">
          <div className="text-xs text-slate-500">{t.id}</div>
          <div className="text-lg font-semibold">{t.subject}</div>
          <div className="text-sm text-slate-500 mt-1">{t.client}</div>
          <div className="grid grid-cols-2 gap-3 text-sm mt-4">
            <div><div className="text-xs text-slate-400">ความสำคัญ</div><Badge tone={pTone[t.priority]}>{pLabel[t.priority]}</Badge></div>
            <div><div className="text-xs text-slate-400">ผู้รับผิดชอบ</div>{t.assignee}</div>
            <div><div className="text-xs text-slate-400">ช่องทาง</div>{t.channel}</div>
            <div><div className="text-xs text-slate-400">สถานะ</div>{sLabel[t.status]}</div>
          </div>
          <div className="mt-5 rounded-xl p-4 bg-gradient-to-br from-indigo-50 to-fuchsia-50 border border-indigo-100">
            <div className="text-sm font-medium flex items-center gap-1.5 text-indigo-700"><Sparkles size={16} /> AI แนะนำวิธีแก้ไข</div>
            <p className="text-sm text-slate-700 mt-1">{aiSuggest[t.id]}</p>
          </div>
          <div className="flex gap-2 mt-5">
            <button className="btn btn-ghost flex-1 justify-center" onClick={() => { setToast("ส่งคำตอบที่ AI ร่างให้ลูกค้าแล้ว"); setTimeout(() => setToast(null), 1800); }}>ตอบด้วย AI</button>
            <button className="btn btn-primary flex-1 justify-center" onClick={resolve} disabled={t.status === "resolved"}>ปิด Ticket</button>
          </div>
        </div>
      </div>
      <Toast message={toast} />
    </div>
  );
}
