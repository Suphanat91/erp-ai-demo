"use client";

import { useEffect, useState } from "react";
import { Cloud, Server, Activity, RefreshCw, ShieldCheck, Power } from "lucide-react";
import { PageHeader, StatCard, Badge, Progress, Toast } from "@/components/ui";
import { AreaLine } from "@/components/charts";
import { cloudServers, subscriptions, thb, monthlyRevenue } from "@/lib/data";

const subTone = { active: "emerald", renewal: "amber", overdue: "rose" } as const;
const subLabel = { active: "ใช้งานอยู่", renewal: "ใกล้ต่ออายุ", overdue: "ค้างชำระ" } as const;

export default function CloudPage() {
  const [servers, setServers] = useState(cloudServers);
  const [toast, setToast] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // จำลองค่า CPU แบบเรียลไทม์
  useEffect(() => {
    const t = setInterval(() => {
      setTick((x) => x + 1);
      setServers((ss) => ss.map((s) => s.status === "stopped" ? s : { ...s, cpu: Math.max(3, Math.min(98, s.cpu + Math.round((Math.random() - 0.5) * 10))) }));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const toggle = (name: string) => {
    setServers((ss) => ss.map((s) => s.name === name ? { ...s, status: s.status === "stopped" ? "running" : "stopped", cpu: s.status === "stopped" ? 15 : 0 } : s));
    setToast(`ส่งคำสั่งไปยัง ${name} แล้ว`);
    setTimeout(() => setToast(null), 1800);
  };

  const mrr = subscriptions.reduce((s, x) => s + x.mrr, 0);

  return (
    <div>
      <PageHeader
        title="Cloud & Subscription"
        subtitle="บริหารเซิร์ฟเวอร์ลูกค้า, แพ็กเกจ SaaS และรายได้ประจำ (Recurring Revenue)"
        actions={<button className="btn btn-primary"><Cloud size={16} /> สร้าง Instance ใหม่</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="MRR (รายได้ประจำ/เดือน)" value={thb(mrr)} icon={Activity} tone="sky" delta={12.5} />
        <StatCard label="ARR (คาดการณ์รายปี)" value={thb(mrr * 12)} icon={Activity} tone="indigo" />
        <StatCard label="Instance ที่ทำงาน" value={`${servers.filter((s) => s.status !== "stopped").length} / ${servers.length}`} icon={Server} tone="emerald" />
        <StatCard label="Uptime (30 วัน)" value="99.97%" icon={ShieldCheck} tone="fuchsia" hint="SLA 99.9%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 xl:col-span-2 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">สถานะเซิร์ฟเวอร์ลูกค้า</div>
            <span className="text-xs text-slate-500 flex items-center gap-1"><RefreshCw size={12} className={tick % 2 ? "animate-spin" : ""} /> Live monitoring</span>
          </div>
          <table className="table-base">
            <thead><tr><th>Instance</th><th>Region</th><th className="w-28">CPU</th><th className="w-28">RAM</th><th className="w-28">Disk</th><th>สถานะ</th><th /></tr></thead>
            <tbody>
              {servers.map((s) => (
                <tr key={s.name}>
                  <td><div className="font-medium font-mono text-xs">{s.name}</div><div className="text-xs text-slate-500">{s.client} · {s.plan}</div></td>
                  <td className="text-xs">{s.region}</td>
                  {[s.cpu, s.ram, s.disk].map((v, i) => (
                    <td key={i}><div className="flex items-center gap-2"><Progress value={v} tone={v > 85 ? "rose" : v > 70 ? "amber" : "emerald"} /><span className="text-xs w-8">{v}%</span></div></td>
                  ))}
                  <td>
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span className={`size-2 rounded-full ${s.status === "running" ? "bg-emerald-500 animate-pulse" : s.status === "warning" ? "bg-amber-500 animate-pulse" : "bg-slate-300"}`} />
                      {s.status === "running" ? "ปกติ" : s.status === "warning" ? "เฝ้าระวัง" : "หยุด"}
                    </span>
                  </td>
                  <td><button onClick={() => toggle(s.name)} className="text-slate-400 hover:text-indigo-600" title="เปิด/ปิด"><Power size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card p-5">
          <div className="font-semibold">การเติบโตรายได้ Cloud</div>
          <div className="text-xs text-slate-500 mb-4">ล้านบาท / เดือน</div>
          <AreaLine values={monthlyRevenue.map((m) => m.cloud)} labels={monthlyRevenue.filter((_, i) => i % 2 === 0).map((m) => m.m)} color="#0ea5e9" height={160} />
          <div className="grid grid-cols-3 gap-2 mt-5 text-center">
            <div className="rounded-xl bg-slate-50 p-3"><div className="text-lg font-semibold">{subscriptions.length}</div><div className="text-[11px] text-slate-500">ลูกค้า SaaS</div></div>
            <div className="rounded-xl bg-slate-50 p-3"><div className="text-lg font-semibold">1.8%</div><div className="text-[11px] text-slate-500">Churn rate</div></div>
            <div className="rounded-xl bg-slate-50 p-3"><div className="text-lg font-semibold">118%</div><div className="text-[11px] text-slate-500">NRR</div></div>
          </div>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <div className="p-5 pb-3 font-semibold">Subscription ลูกค้า</div>
        <table className="table-base">
          <thead><tr><th>ลูกค้า</th><th>แพ็กเกจ</th><th className="text-right">ผู้ใช้</th><th className="text-right">MRR</th><th>ต่ออายุ</th><th>สถานะ</th></tr></thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.client}>
                <td className="font-medium">{s.client}</td>
                <td>{s.plan}</td>
                <td className="text-right">{s.users || "-"}</td>
                <td className="text-right font-medium">{thb(s.mrr)}</td>
                <td>{new Date(s.renew).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td><Badge tone={subTone[s.status as keyof typeof subTone]}>{subLabel[s.status as keyof typeof subLabel]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toast message={toast} />
    </div>
  );
}
