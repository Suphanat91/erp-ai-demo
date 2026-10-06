"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Bot, User, FileSearch, LineChart, ScanText, MessageSquareText } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { invoices, leads, monthlyRevenue, products, projects, subscriptions, thb } from "@/lib/data";

type Msg = { role: "user" | "ai"; text: string };

const suggestions = [
  "สรุปยอดขายเดือนนี้",
  "ลูกหนี้ที่เกินกำหนดมีใครบ้าง",
  "โครงการไหนมีความเสี่ยง",
  "พยากรณ์รายได้ไตรมาส 4",
  "สินค้าไหนควรสั่งเพิ่ม",
  "ดีลไหนน่าปิดได้มากที่สุด",
];

function answer(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("ลูกหนี้") || s.includes("ค้าง") || s.includes("เกินกำหนด")) {
    const od = invoices.filter((i) => i.status === "overdue");
    return `พบใบแจ้งหนี้เกินกำหนด ${od.length} รายการ รวม ${thb(od.reduce((a, b) => a + b.amount, 0))}\n\n${od.map((i) => `• ${i.no} — ${i.client} ${thb(i.amount)} (ครบกำหนด ${i.due})`).join("\n")}\n\n✅ ผมร่างอีเมลทวงถามแบบสุภาพไว้ให้แล้ว ต้องการให้ส่งอัตโนมัติไหมครับ?`;
  }
  if (s.includes("เสี่ยง") || s.includes("โครงการ")) {
    const risky = projects.filter((p) => (p.spent / p.budget) * 100 - p.progress > 10);
    return `วิเคราะห์ ${projects.length} โครงการ พบความเสี่ยงด้านงบประมาณ ${risky.length} โครงการ:\n\n${risky.map((p) => `• ${p.name} — ใช้งบ ${((p.spent / p.budget) * 100).toFixed(0)}% แต่ความคืบหน้า ${p.progress}%`).join("\n")}\n\n💡 คำแนะนำ: ทบทวน scope กับลูกค้า และพิจารณาออก Change Request สำหรับงานที่เพิ่มขึ้น`;
  }
  if (s.includes("พยากรณ์") || s.includes("forecast") || s.includes("ไตรมาส")) {
    const last3 = monthlyRevenue.slice(-3).reduce((a, m) => a + m.software + m.hardware + m.cloud + m.service, 0);
    return `📈 พยากรณ์รายได้ไตรมาส 4/2569 (โมเดล Time-series + Pipeline):\n\n• ต.ค. ≈ ฿9.4M\n• พ.ย. ≈ ฿10.1M\n• ธ.ค. ≈ ฿11.6M (ปิดงบประมาณภาครัฐ)\n\nรวม Q4 ≈ ฿31.1M เติบโต ${(((31.1 - last3) / last3) * 100).toFixed(0)}% จาก Q3 (฿${last3.toFixed(1)}M)\nความแม่นยำโมเดลย้อนหลัง 94.2%`;
  }
  if (s.includes("สั่ง") || s.includes("สต็อก") || s.includes("สินค้า")) {
    const low = products.filter((p) => p.stock !== null && p.stock <= 4);
    return `สินค้าที่ต่ำกว่าจุดสั่งซื้อ:\n\n${low.map((p) => `• ${p.name} — เหลือ ${p.stock} ${p.unit}`).join("\n")}\n\n🤖 จากยอดขายย้อนหลังและดีลใน Pipeline แนะนำสั่ง: GPU L40S +4, ชุด POS +15 (สำหรับดีลร้านกาแฟ), Server DL380 +2\nผมสร้างใบขอซื้อ (PR) ร่างไว้ให้แล้วครับ`;
  }
  if (s.includes("ดีล") || s.includes("ปิด") || s.includes("lead")) {
    const top = [...leads].filter((l) => l.stage !== "won").sort((a, b) => b.aiScore - a.aiScore).slice(0, 3);
    return `🎯 ดีลที่มีโอกาสปิดสูงสุด (AI Score):\n\n${top.map((l, i) => `${i + 1}. ${l.company} — ${l.interest} ${thb(l.value)} (Score ${l.aiScore})`).join("\n")}\n\nแนะนำ: นัด Demo ระบบกับ ${top[0].company} ภายในสัปดาห์นี้ และเสนอ Package On Cloud แบบรายเดือนเพื่อลดภาระงบลงทุน`;
  }
  if (s.includes("ยอดขาย") || s.includes("รายได้") || s.includes("สรุป")) {
    const m = monthlyRevenue[monthlyRevenue.length - 1];
    const tot = m.software + m.hardware + m.cloud + m.service;
    const mrr = subscriptions.reduce((a, b) => a + b.mrr, 0);
    return `📊 สรุปเดือนกันยายน 2569:\n\n• รายได้รวม ฿${tot.toFixed(1)}M (สูงสุดของปี +16% MoM)\n• ซอฟต์แวร์/พัฒนาระบบ ฿${m.software}M\n• Hardware ฿${m.hardware}M\n• Cloud/SaaS ฿${m.cloud}M — MRR ปัจจุบัน ${thb(mrr)}\n• MA & บริการ ฿${m.service}M\n\nจุดเด่น: ธุรกิจ Cloud เติบโตต่อเนื่อง 9 เดือนติด แนะนำผลักดันลูกค้า On-premise ย้ายขึ้น Cloud`;
  }
  return `ผมเป็น AI ผู้ช่วยของ NexERP ที่เชื่อมต่อข้อมูลทุกโมดูลในระบบ (การขาย, โครงการ, คลัง, Cloud, บัญชี, HR)\n\nลองถามได้ เช่น "สรุปยอดขายเดือนนี้", "โครงการไหนมีความเสี่ยง" หรือ "สินค้าไหนควรสั่งเพิ่ม" ครับ`;
}

const features = [
  { icon: LineChart, title: "พยากรณ์ยอดขาย", desc: "Machine Learning คาดการณ์รายได้และกระแสเงินสด" },
  { icon: ScanText, title: "AI OCR เอกสาร", desc: "อ่านใบกำกับภาษี/ใบสั่งซื้อ บันทึกบัญชีอัตโนมัติ" },
  { icon: FileSearch, title: "ตรวจจับความผิดปกติ", desc: "แจ้งเตือนรายการบัญชีหรือการใช้งบที่ผิดปกติ" },
  { icon: MessageSquareText, title: "Chat กับข้อมูลองค์กร", desc: "ถามเป็นภาษาไทย ได้คำตอบจากข้อมูลจริงในระบบ" },
];

export default function AIPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "สวัสดีครับ 👋 ผมคือ NexERP AI ผู้ช่วยวิเคราะห์ธุรกิจของคุณ วันนี้ให้ช่วยอะไรดีครับ?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const full = answer(text);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: "" }]);
      let i = 0;
      const iv = setInterval(() => {
        i += 4;
        setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "ai", text: full.slice(0, i) }; return c; });
        if (i >= full.length) { clearInterval(iv); setTyping(false); }
      }, 15);
    }, 700);
  };

  return (
    <div>
      <PageHeader title="AI ผู้ช่วยอัจฉริยะ" subtitle="ถาม-ตอบข้อมูลธุรกิจเป็นภาษาไทย เชื่อมต่อทุกโมดูลของ ERP" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card xl:col-span-2 flex flex-col h-[calc(100vh-220px)] min-h-[520px]">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`size-8 shrink-0 rounded-full grid place-items-center text-white ${m.role === "ai" ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500" : "bg-slate-700"}`}>
                  {m.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${m.role === "ai" ? "bg-slate-100" : "bg-indigo-600 text-white"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && msgs[msgs.length - 1].role === "user" && (
              <div className="flex gap-3">
                <div className="size-8 rounded-full grid place-items-center text-white bg-gradient-to-br from-indigo-500 to-fuchsia-500"><Bot size={16} /></div>
                <div className="rounded-2xl px-4 py-3 bg-slate-100 text-slate-500 text-sm flex gap-1">
                  <span className="animate-bounce">●</span><span className="animate-bounce [animation-delay:.15s]">●</span><span className="animate-bounce [animation-delay:.3s]">●</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t border-slate-100 p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-50 cursor-pointer">{s}</button>
              ))}
            </div>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input className="input" placeholder="พิมพ์คำถามเกี่ยวกับธุรกิจของคุณ..." value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="btn btn-primary" type="submit" disabled={typing}><Send size={16} /></button>
            </form>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card p-5 bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white border-0">
            <Sparkles />
            <div className="font-semibold text-lg mt-2">AI ในทุกโมดูล</div>
            <p className="text-sm text-white/80 mt-1">รองรับ LLM ชั้นนำ ทั้งแบบ On Cloud และติดตั้งภายในองค์กร (On-premise) เพื่อความปลอดภัยของข้อมูล ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)</p>
          </div>
          {features.map((f) => (
            <div key={f.title} className="card p-4 flex gap-3">
              <div className="grid place-items-center size-10 rounded-xl bg-indigo-50 text-indigo-600 shrink-0"><f.icon size={20} /></div>
              <div><div className="font-medium">{f.title}</div><div className="text-sm text-slate-500">{f.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
