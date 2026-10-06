"use client";

import { Users, Gauge, CalendarOff, Briefcase } from "lucide-react";
import { PageHeader, StatCard, Badge, Progress } from "@/components/ui";
import { employees } from "@/lib/data";

export default function HR() {
  const avg = Math.round(employees.reduce((s, e) => s + e.util, 0) / employees.length);
  const depts = Array.from(new Set(employees.map((e) => e.dept)));

  return (
    <div>
      <PageHeader title="บุคลากร & ทรัพยากร" subtitle="บริหารทีมพัฒนา, อัตราการใช้ทรัพยากร (Utilization) และทักษะของทีม" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="พนักงานทั้งหมด" value={`${employees.length} คน`} icon={Users} tone="indigo" />
        <StatCard label="Utilization เฉลี่ย" value={`${avg}%`} icon={Gauge} tone="emerald" hint="เป้าหมาย 80%" />
        <StatCard label="ลางานวันนี้" value={`${employees.filter((e) => e.status === "leave").length} คน`} icon={CalendarOff} tone="amber" />
        <StatCard label="แผนก" value={`${depts.length} แผนก`} icon={Briefcase} tone="sky" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card xl:col-span-2 overflow-x-auto">
          <div className="p-5 pb-3 font-semibold">รายชื่อพนักงาน</div>
          <table className="table-base">
            <thead><tr><th>พนักงาน</th><th>แผนก</th><th>ทักษะ</th><th className="w-44">Utilization</th><th>สถานะ</th></tr></thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.name}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 grid place-items-center text-white text-xs font-semibold">{e.name.slice(0, 2)}</div>
                      <div><div className="font-medium">{e.name}</div><div className="text-xs text-slate-500">{e.role}</div></div>
                    </div>
                  </td>
                  <td>{e.dept}</td>
                  <td className="space-x-1">{e.skills.map((s) => <Badge key={s}>{s}</Badge>)}</td>
                  <td><div className="flex items-center gap-2"><Progress value={e.util} tone={e.util > 90 ? "rose" : e.util > 75 ? "emerald" : "amber"} /><span className="text-xs w-8">{e.util}%</span></div></td>
                  <td>{e.status === "active" ? <Badge tone="emerald">ทำงาน</Badge> : <Badge tone="amber">ลางาน</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <div className="font-semibold mb-4">Utilization ตามแผนก</div>
            <div className="space-y-4">
              {depts.map((d) => {
                const es = employees.filter((e) => e.dept === d);
                const u = Math.round(es.reduce((s, e) => s + e.util, 0) / es.length);
                return (
                  <div key={d}>
                    <div className="flex justify-between text-sm mb-1"><span>{d} <span className="text-slate-400 text-xs">({es.length} คน)</span></span><span className="font-medium">{u}%</span></div>
                    <Progress value={u} tone={u > 90 ? "rose" : "indigo"} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card p-5 bg-gradient-to-br from-fuchsia-50 to-indigo-50 border-indigo-100">
            <div className="font-semibold mb-2">🤖 AI แนะนำการจัดสรรทีม</div>
            <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
              <li>ปิยะ (95%) มีภาระงานสูงเกินไป — แนะนำย้ายงาน API บางส่วนให้ ชยพล</li>
              <li>ทีม AI Lab ใกล้เต็มกำลัง — ควรรับ Data Engineer เพิ่ม 1 ตำแหน่งก่อน Q1/2570</li>
              <li>สุดารัตน์ (58%) ว่างพอจะรับงานติดตั้ง POS ที่ ร้านกาแฟ 12 สาขา</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
