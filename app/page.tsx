"use client";

import Link from "next/link";
import { Wallet, TrendingUp, FolderKanban, Cloud, Sparkles, AlertTriangle, ArrowRight, Server } from "lucide-react";
import { PageHeader, StatCard, Badge, Progress } from "@/components/ui";
import { StackedBars, Donut, AreaLine } from "@/components/charts";
import { monthlyRevenue, projects, invoices, tickets, subscriptions, thb, projectStatusLabel } from "@/lib/data";

export default function Dashboard() {
  const ytd = monthlyRevenue.reduce((s, m) => s + m.software + m.hardware + m.cloud + m.service, 0);
  const mrr = subscriptions.reduce((s, x) => s + x.mrr, 0);
  const ar = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const activeProjects = projects.filter((p) => p.status !== "done").length;
  const last = monthlyRevenue[monthlyRevenue.length - 1];
  const sum = (k: "software" | "hardware" | "cloud" | "service") => monthlyRevenue.reduce((s, m) => s + m[k], 0);

  return (
    <div>
      <PageHeader
        title="สวัสดีครับ คุณผู้บริหาร 👋"
        subtitle="ภาพรวมธุรกิจ ณ วันที่ 6 ตุลาคม 2569 — อัปเดตแบบเรียลไทม์"
        actions={
          <>
            <button className="btn btn-ghost">ส่งออกรายงาน PDF</button>
            <Link href="/ai" className="btn btn-primary"><Sparkles size={16} /> ถาม AI</Link>
          </>
        }
      />

      {/* AI Insight banner */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white flex flex-wrap items-center gap-4">
        <div className="grid place-items-center size-11 rounded-xl bg-white/15"><Sparkles /></div>
        <div className="flex-1 min-w-[240px]">
          <div className="font-semibold">AI Insight ประจำวัน</div>
          <div className="text-sm text-white/85">
            รายได้ Cloud โต <b>+12.5%</b> เดือนนี้ · มี 2 ใบแจ้งหนี้เกินกำหนด (95,900 ฿) · โครงการ &quot;AI Vision&quot; มีความเสี่ยงงบประมาณเกิน 79% — แนะนำให้ติดตามด่วน
          </div>
        </div>
        <Link href="/ai" className="btn bg-white text-indigo-700 hover:bg-indigo-50">ดูคำแนะนำ <ArrowRight size={16} /></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="รายได้สะสม (YTD)" value={`฿${ytd.toFixed(1)} ล้าน`} delta={18.2} hint="เทียบปีก่อน" icon={Wallet} tone="indigo" />
        <StatCard label="รายได้ประจำ Cloud (MRR)" value={thb(mrr)} delta={12.5} hint="เทียบเดือนก่อน" icon={Cloud} tone="sky" />
        <StatCard label="โครงการที่กำลังดำเนินการ" value={`${activeProjects} โครงการ`} hint={`มูลค่ารวม ${thb(projects.reduce((s, p) => s + p.budget, 0))}`} icon={FolderKanban} tone="fuchsia" />
        <StatCard label="ลูกหนี้ค้างรับ" value={thb(ar)} delta={-4.1} hint="ลดลงจากเดือนก่อน" icon={TrendingUp} tone="emerald" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">รายได้รายเดือนแยกตามธุรกิจ</div>
              <div className="text-xs text-slate-500">หน่วย: ล้านบาท · ปี 2569</div>
            </div>
            <Badge tone="emerald">ก.ย. ทำสถิติสูงสุด ฿{(last.software + last.hardware + last.cloud + last.service).toFixed(1)}M</Badge>
          </div>
          <StackedBars
            data={monthlyRevenue}
            xKey="m"
            unit="M"
            series={[
              { key: "software", label: "ซอฟต์แวร์ / พัฒนาระบบ", color: "#6366f1" },
              { key: "hardware", label: "Hardware", color: "#f59e0b" },
              { key: "cloud", label: "Cloud / SaaS", color: "#0ea5e9" },
              { key: "service", label: "MA & บริการ", color: "#d946ef" },
            ]}
          />
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-1">สัดส่วนรายได้</div>
          <div className="text-xs text-slate-500 mb-5">มกราคม – กันยายน 2569</div>
          <Donut
            center={<div><div className="text-xl font-semibold">฿{ytd.toFixed(1)}M</div><div className="text-[11px] text-slate-500">รวมทั้งหมด</div></div>}
            items={[
              { label: "ซอฟต์แวร์", value: sum("software"), color: "#6366f1" },
              { label: "Hardware", value: sum("hardware"), color: "#f59e0b" },
              { label: "Cloud", value: sum("cloud"), color: "#0ea5e9" },
              { label: "บริการ", value: sum("service"), color: "#d946ef" },
            ]}
          />
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">MRR Cloud ย้อนหลัง</span><span className="text-emerald-600 font-medium">+125%</span></div>
            <AreaLine values={monthlyRevenue.map((m) => m.cloud)} color="#0ea5e9" height={60} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="font-semibold">โครงการที่กำลังดำเนินการ</div>
            <Link href="/projects" className="text-sm text-indigo-600 hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead><tr><th>โครงการ</th><th>ประเภท</th><th>สถานะ</th><th className="w-48">ความคืบหน้า</th><th>กำหนดส่ง</th></tr></thead>
              <tbody>
                {projects.filter((p) => p.status !== "done").slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td><div className="font-medium">{p.name}</div><div className="text-xs text-slate-500">{p.client}</div></td>
                    <td><Badge tone="indigo">{p.type}</Badge></td>
                    <td className="text-slate-600">{projectStatusLabel[p.status]}</td>
                    <td><div className="flex items-center gap-2"><Progress value={p.progress} tone={p.progress > 80 ? "emerald" : "indigo"} /><span className="text-xs w-8">{p.progress}%</span></div></td>
                    <td className="text-slate-600">{new Date(p.due).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500" /> เรื่องที่ต้องดำเนินการ</div>
          <ul className="space-y-3 text-sm">
            {tickets.filter((t) => t.priority === "critical" || t.priority === "high").slice(0, 2).map((t) => (
              <li key={t.id} className="flex gap-3">
                <span className={`mt-1.5 size-2 rounded-full shrink-0 ${t.priority === "critical" ? "bg-rose-500" : "bg-amber-500"}`} />
                <div><div className="font-medium">{t.subject}</div><div className="text-xs text-slate-500">{t.id} · {t.client} · SLA {t.sla}</div></div>
              </li>
            ))}
            {invoices.filter((i) => i.status === "overdue").map((i) => (
              <li key={i.no} className="flex gap-3">
                <span className="mt-1.5 size-2 rounded-full shrink-0 bg-rose-500" />
                <div><div className="font-medium">ใบแจ้งหนี้เกินกำหนด {thb(i.amount)}</div><div className="text-xs text-slate-500">{i.no} · {i.client}</div></div>
              </li>
            ))}
            <li className="flex gap-3">
              <span className="mt-1.5 size-2 rounded-full shrink-0 bg-amber-500" />
              <div><div className="font-medium flex items-center gap-1"><Server size={14} /> สต็อก GPU L40S เหลือ 2 การ์ด</div><div className="text-xs text-slate-500">ต่ำกว่าจุดสั่งซื้อ — AI แนะนำสั่งเพิ่ม 4 การ์ด</div></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
