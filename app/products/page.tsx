"use client";

import { useMemo, useState } from "react";
import { Package, AlertTriangle, ShoppingCart, Search, FileText, Trash2, Plus, Minus, Printer } from "lucide-react";
import { PageHeader, StatCard, Badge, Tabs, Modal, Toast } from "@/components/ui";
import { products, categoryLabel, company, thb, num, type ProductCategory } from "@/lib/data";

const catTone: Record<ProductCategory, "indigo" | "amber" | "sky" | "fuchsia"> = {
  software: "indigo", hardware: "amber", cloud: "sky", service: "fuchsia",
};

export default function Products() {
  const [cat, setCat] = useState<"all" | ProductCategory>("all");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showQuote, setShowQuote] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const list = useMemo(
    () => products.filter((p) => (cat === "all" || p.category === cat) && (p.name + p.sku).toLowerCase().includes(q.toLowerCase())),
    [cat, q],
  );
  const lowStock = products.filter((p) => p.stock !== null && p.stock <= 4);
  const stockValue = products.reduce((s, p) => s + (p.stock ?? 0) * p.cost, 0);

  const add = (sku: string) => {
    setCart((c) => ({ ...c, [sku]: (c[sku] ?? 0) + 1 }));
    setToast("เพิ่มลงใบเสนอราคาแล้ว");
    setTimeout(() => setToast(null), 1500);
  };
  const setQty = (sku: string, d: number) =>
    setCart((c) => {
      const n = (c[sku] ?? 0) + d;
      const copy = { ...c };
      if (n <= 0) delete copy[sku]; else copy[sku] = n;
      return copy;
    });

  const lines = Object.entries(cart).map(([sku, qty]) => ({ p: products.find((x) => x.sku === sku)!, qty }));
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const vat = subtotal * 0.07;
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div>
      <PageHeader
        title="สินค้า & คลังสินค้า"
        subtitle="ซอฟต์แวร์สำเร็จรูป · Hardware · Cloud Package · บริการ — เลือกสินค้าเพื่อสร้างใบเสนอราคาได้ทันที"
        actions={
          <button className="btn btn-primary relative" onClick={() => setShowQuote(true)}>
            <ShoppingCart size={16} /> ใบเสนอราคา
            {count > 0 && <span className="absolute -top-2 -right-2 size-5 grid place-items-center rounded-full bg-rose-500 text-[11px]">{count}</span>}
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="รายการสินค้า/บริการ" value={`${products.length} SKU`} icon={Package} tone="indigo" />
        <StatCard label="มูลค่าสต็อก Hardware" value={thb(stockValue)} icon={Package} tone="amber" />
        <StatCard label="License ที่ขายได้ (ปีนี้)" value={num(products.filter((p) => p.category === "software").reduce((s, p) => s + p.sold, 0))} icon={FileText} tone="emerald" delta={31} />
        <StatCard label="สินค้าใกล้หมด" value={`${lowStock.length} รายการ`} icon={AlertTriangle} tone="rose" hint="ต่ำกว่าจุดสั่งซื้อ" />
      </div>

      {lowStock.length > 0 && (
        <div className="card p-4 mb-6 border-amber-200 bg-amber-50/60 flex flex-wrap items-center gap-3 text-sm">
          <AlertTriangle className="text-amber-500" size={18} />
          <span className="font-medium">AI แนะนำสั่งซื้อเพิ่ม:</span>
          {lowStock.map((p) => <Badge key={p.sku} tone="amber">{p.name} (เหลือ {p.stock})</Badge>)}
          <button className="btn btn-ghost ml-auto py-1.5" onClick={() => { setToast("สร้างใบขอซื้อ (PR) อัตโนมัติแล้ว"); setTimeout(() => setToast(null), 2000); }}>สร้างใบขอซื้อ (PR)</button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Tabs value={cat} onChange={setCat} items={[{ key: "all", label: "ทั้งหมด" }, ...(Object.keys(categoryLabel) as ProductCategory[]).map((k) => ({ key: k, label: categoryLabel[k] }))]} />
        <div className="relative ml-auto w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="ค้นหาชื่อสินค้า / SKU" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="table-base">
          <thead><tr><th>SKU</th><th>ชื่อสินค้า/บริการ</th><th>หมวด</th><th className="text-right">ราคาขาย</th><th className="text-right">กำไรขั้นต้น</th><th className="text-right">คงเหลือ</th><th className="text-right">ขายแล้ว</th><th /></tr></thead>
          <tbody>
            {list.map((p) => {
              const margin = ((p.price - p.cost) / p.price) * 100;
              return (
                <tr key={p.sku}>
                  <td className="text-slate-500 font-mono text-xs">{p.sku}</td>
                  <td className="font-medium">{p.name}</td>
                  <td><Badge tone={catTone[p.category as ProductCategory]}>{categoryLabel[p.category as ProductCategory]}</Badge></td>
                  <td className="text-right">{thb(p.price)} <span className="text-xs text-slate-400">/{p.unit}</span></td>
                  <td className="text-right"><span className={margin > 50 ? "text-emerald-600" : "text-slate-600"}>{margin.toFixed(0)}%</span></td>
                  <td className="text-right">
                    {p.stock === null ? <span className="text-slate-400">ไม่จำกัด</span> : <span className={p.stock <= 4 ? "text-rose-600 font-medium" : ""}>{p.stock}</span>}
                  </td>
                  <td className="text-right">{num(p.sold)}</td>
                  <td className="text-right"><button className="btn btn-ghost py-1 px-3" onClick={() => add(p.sku)}><Plus size={14} /> เพิ่ม</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={showQuote} onClose={() => setShowQuote(false)} title="ใบเสนอราคา (Quotation)">
        {lines.length === 0 ? (
          <div className="text-center text-slate-500 py-10">ยังไม่มีรายการ — กดปุ่ม &quot;เพิ่ม&quot; ที่สินค้าเพื่อสร้างใบเสนอราคา</div>
        ) : (
          <div>
            <div className="text-xs text-slate-500 mb-3">
              <div className="font-medium text-slate-700">{company.name}</div>
              เลขประจำตัวผู้เสียภาษี {company.taxId} · เลขที่ QT-2610-0047
            </div>
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
              {lines.map(({ p, qty }) => (
                <div key={p.sku} className="py-2.5 flex items-center gap-3 text-sm">
                  <div className="flex-1 min-w-0"><div className="truncate">{p.name}</div><div className="text-xs text-slate-400">{thb(p.price)} / {p.unit}</div></div>
                  <div className="flex items-center gap-1">
                    <button className="size-7 grid place-items-center rounded-lg border" onClick={() => setQty(p.sku, -1)}><Minus size={12} /></button>
                    <span className="w-6 text-center">{qty}</span>
                    <button className="size-7 grid place-items-center rounded-lg border" onClick={() => setQty(p.sku, 1)}><Plus size={12} /></button>
                  </div>
                  <div className="w-28 text-right font-medium">{thb(p.price * qty)}</div>
                  <button className="text-slate-400 hover:text-rose-500" onClick={() => setQty(p.sku, -qty)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 mt-2 pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">รวมเป็นเงิน</span><span>{thb(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">ภาษีมูลค่าเพิ่ม 7%</span><span>{thb(vat)}</span></div>
              <div className="flex justify-between text-base font-semibold"><span>ยอดสุทธิ</span><span className="text-indigo-600">{thb(subtotal + vat)}</span></div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button className="btn btn-ghost" onClick={() => window.print()}><Printer size={16} /> พิมพ์</button>
              <button className="btn btn-primary" onClick={() => { setCart({}); setShowQuote(false); setToast("ส่งใบเสนอราคาทางอีเมลให้ลูกค้าแล้ว"); setTimeout(() => setToast(null), 2200); }}>
                <FileText size={16} /> ส่งให้ลูกค้า
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Toast message={toast} />
    </div>
  );
}
