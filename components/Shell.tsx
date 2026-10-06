"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Users, FolderKanban, Package, Cloud, Receipt, UserCog,
  LifeBuoy, Sparkles, Menu, X, Bell, Search, Cpu,
} from "lucide-react";
import { company } from "@/lib/data";

const nav = [
  { href: "/", label: "ภาพรวม (Dashboard)", icon: LayoutDashboard },
  { href: "/ai", label: "AI ผู้ช่วยอัจฉริยะ", icon: Sparkles, badge: "AI" },
  { href: "/crm", label: "CRM & การขาย", icon: Users },
  { href: "/projects", label: "โครงการพัฒนาซอฟต์แวร์", icon: FolderKanban },
  { href: "/products", label: "สินค้า & คลัง (SW/HW)", icon: Package },
  { href: "/cloud", label: "Cloud & Subscription", icon: Cloud },
  { href: "/finance", label: "บัญชี & ใบแจ้งหนี้", icon: Receipt },
  { href: "/hr", label: "บุคลากร & ทรัพยากร", icon: UserCog },
  { href: "/support", label: "Helpdesk / Support", icon: LifeBuoy },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 bg-[#0d1023] text-slate-300 flex flex-col transition-transform ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5">
          <div className="grid place-items-center size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
            <Cpu size={20} />
          </div>
          <div>
            <div className="font-semibold text-white leading-tight">NexERP <span className="text-fuchsia-400">AI</span></div>
            <div className="text-[11px] text-slate-500">Software · Hardware · Cloud</div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="ปิดเมนู">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active ? "bg-indigo-500/15 text-white" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} className={active ? "text-indigo-400" : ""} />
                <span className="flex-1">{n.label}</span>
                {n.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white">
                    {n.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-xl bg-gradient-to-br from-indigo-600/30 to-fuchsia-600/20 p-4 border border-white/5">
          <div className="text-xs text-slate-400">แพ็กเกจปัจจุบัน</div>
          <div className="text-white font-medium">Enterprise · On Cloud</div>
          <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[68%] bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">ใช้งาน 68 / 100 ผู้ใช้</div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur border-b border-slate-200/70 flex items-center gap-4 px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="เปิดเมนู">
            <Menu size={22} />
          </button>
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
            <Search size={16} />
            <span>ค้นหาลูกค้า, โครงการ, ใบแจ้งหนี้...</span>
            <kbd className="ml-auto text-[10px] bg-white px-1.5 py-0.5 rounded border">Ctrl K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              โหมดสาธิต (Demo)
            </span>
            <button className="relative text-slate-500" aria-label="การแจ้งเตือน">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 size-4 grid place-items-center rounded-full bg-rose-500 text-[10px] text-white">5</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 grid place-items-center text-white text-sm font-semibold">
                ผบ
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-medium">ผู้บริหาร</div>
                <div className="text-[11px] text-slate-500">{company.nameEn}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 fade-in" key={pathname}>
          {children}
        </main>
        <footer className="px-8 py-4 text-xs text-slate-400">
          © 2026 NexERP AI — ระบบสาธิตสำหรับนำเสนอลูกค้า ข้อมูลทั้งหมดเป็นข้อมูลจำลอง
        </footer>
      </div>
    </div>
  );
}
