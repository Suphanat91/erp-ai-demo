"use client";

import { useState } from "react";
import { Receipt, CheckCircle2, Clock, AlertCircle, Send, Plus, Sparkles } from "lucide-react";
import { PageHeader, StatCard, Badge, Tabs, Modal, Field, Toast } from "@/components/ui";
import { Donut } from "@/components/charts";
import { invoices as initial, thb, type InvoiceStatus } from "@/lib/data";

const tone: Record<InvoiceStatus, "emerald" | "amber" | "rose" | "slate"> = { paid: "emerald", pending: "amber", overdue: "rose", draft: "slate" };
const label: Record<InvoiceStatus, string> = { paid: "ชำระแล้ว", pending: "รอชำระ", overdue: "เกินกำหนด", draft: "ฉบับร่าง" };

export default function Finance() {
  const [invoices, setInvoices] = useState(initial);
  const [f, setF] = useState<"all" | InvoiceStatus>("all");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ client: "", desc: "", amount: "" });

  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2000); };
  const sumBy = (s: InvoiceStatus) => invoices.filter((i) => i.status === s).reduce((a, b) => a + b.amount, 0);
  const list = f === "all" ? invoices : invoices.filter((i) => i.status === f);

  const markPaid = (no: string) => { setInvoices((v) => v.map((i) => (i.no === no ? { ...i, status: "paid" } : i))); notify(`บันทึกรับชำระ ${no} แล้ว`); };
  const create = () => {
    if (!form.client || !form.amount) return;
    const no = `INV-2610-${String(invoices.length + 1).padStart(4, "0")}`;
    setInvoices([{ no, client: form.client, desc: form.desc || "-", amount: Number(form.amount), date: "2026-10-06", due: "2026-11-05", status: "draft" }, ...invoices]);
    setOpen(false); setForm({ client: "", desc: "", amount: "" });
    notify(`สร้างใบแจ้งหนี้ ${no} แล้ว`);
  };

  return (
    <div>
      <PageHeader
        title="บัญชี & ใบแจ้งหนี้"
        subtitle="ออกใบแจ้งหนี้/ใบกำกับภาษี ติดตามลูกหนี้ และกระแสเงินสด"
        actions={<button className="btn btn-primary" onClick={() => setOpen(true)}><Plus size={16} /> ออกใบแจ้งหนี้</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="รับชำระแล้ว (เดือนนี้)" value={thb(sumBy("paid"))} icon={CheckCircle2} tone="emerald" />
        <StatCard label="รอชำระ" value={thb(sumBy("pending"))} icon={Clock} tone="amber" />
        <StatCard label="เกินกำหนดชำระ" value={thb(sumBy("overdue"))} icon={AlertCircle} tone="rose" hint={`${invoices.filter((i) => i.status === "overdue").length} ใบ`} />
        <StatCard label="ใบแจ้งหนี้ทั้งหมด" value={`${invoices.length} ใบ`} icon={Receipt} tone="indigo" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <div className="font-semibold mb-4">สถานะลูกหนี้</div>
          <Donut
            center={<div><div className="text-lg font-semibold">{thb(sumBy("pending") + sumBy("overdue"))}</div><div className="text-[11px] text-slate-500">ค้างรับ</div></div>}
            items={[
              { label: "ชำระแล้ว", value: sumBy("paid") || 1, color: "#10b981" },
              { label: "รอชำระ", value: sumBy("pending") || 1, color: "#f59e0b" },
              { label: "เกินกำหนด", value: sumBy("overdue") || 1, color: "#f43f5e" },
            ]}
          />
        </div>
        <div className="card p-5 xl:col-span-2">
          <div className="font-semibold mb-1 flex items-center gap-2"><Sparkles size={16} className="text-fuchsia-500" /> AI วิเคราะห์กระแสเงินสด</div>
          <div className="text-xs text-slate-500 mb-4">คาดการณ์ 90 วันข้างหน้า</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { m: "ต.ค. 69", in: 2.45, out: 1.62 },
              { m: "พ.ย. 69", in: 3.10, out: 1.75 },
              { m: "ธ.ค. 69", in: 3.85, out: 2.05 },
            ].map((x) => (
              <div key={x.m} className="rounded-xl border border-slate-100 p-4">
                <div className="text-sm text-slate-500">{x.m}</div>
                <div className="flex justify-between text-sm mt-2"><span>เงินเข้า</span><span className="text-emerald-600 font-medium">฿{x.in}M</span></div>
                <div className="flex justify-between text-sm"><span>เงินออก</span><span className="text-rose-600 font-medium">฿{x.out}M</span></div>
                <div className="flex justify-between text-sm border-t mt-2 pt-2 font-semibold"><span>สุทธิ</span><span>฿{(x.in - x.out).toFixed(2)}M</span></div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm rounded-xl bg-indigo-50 text-indigo-800 p-3">
            💡 แนะนำ: ส่งการแจ้งเตือนอัตโนมัติให้ลูกหนี้ที่เกินกำหนด 2 ราย และเสนอส่วนลด 2% สำหรับการชำระก่อนกำหนดของ บมจ. สยามรีเทล เพื่อเร่งกระแสเงินสด ฿840,000
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Tabs value={f} onChange={setF} items={[{ key: "all", label: "ทั้งหมด" }, { key: "pending", label: "รอชำระ" }, { key: "overdue", label: "เกินกำหนด" }, { key: "paid", label: "ชำระแล้ว" }, { key: "draft", label: "ฉบับร่าง" }]} />
      </div>
      <div className="card overflow-x-auto">
        <table className="table-base">
          <thead><tr><th>เลขที่</th><th>ลูกค้า</th><th>รายละเอียด</th><th className="text-right">จำนวนเงิน</th><th>ครบกำหนด</th><th>สถานะ</th><th /></tr></thead>
          <tbody>
            {list.map((i) => (
              <tr key={i.no}>
                <td className="font-mono text-xs">{i.no}</td>
                <td className="font-medium">{i.client}</td>
                <td className="text-slate-600">{i.desc}</td>
                <td className="text-right font-medium">{thb(i.amount)}</td>
                <td>{new Date(i.due).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" })}</td>
                <td><Badge tone={tone[i.status]}>{label[i.status]}</Badge></td>
                <td className="text-right space-x-2">
                  {i.status !== "paid" && <button className="text-xs text-emerald-600 hover:underline" onClick={() => markPaid(i.no)}>รับชำระ</button>}
                  {i.status === "overdue" && <button className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1" onClick={() => notify(`ส่งแจ้งเตือนทวงถามไปยัง ${i.client} แล้ว`)}><Send size={12} />ทวงถาม</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="ออกใบแจ้งหนี้ใหม่">
        <div className="space-y-3">
          <Field label="ลูกค้า *"><input className="input" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="ชื่อลูกค้า" /></Field>
          <Field label="รายละเอียด"><input className="input" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="เช่น ค่าพัฒนาระบบงวดที่ 1" /></Field>
          <Field label="จำนวนเงิน (บาท) *"><input type="number" className="input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></Field>
          <div className="flex justify-end gap-2 pt-2">
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>ยกเลิก</button>
            <button className="btn btn-primary" onClick={create}>สร้างใบแจ้งหนี้</button>
          </div>
        </div>
      </Modal>
      <Toast message={toast} />
    </div>
  );
}
