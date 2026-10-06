"use client";

import { useState } from "react";

type Series = { key: string; label: string; color: string };

// กราฟแท่งซ้อน (Stacked bar) แบบ SVG ไม่ต้องใช้ไลบรารีเพิ่ม
export function StackedBars<T extends Record<string, number | string>>({
  data, xKey, series, unit = "",
}: { data: T[]; xKey: keyof T; series: Series[]; unit?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const totals = data.map((d) => series.reduce((s, x) => s + Number(d[x.key]), 0));
  const max = Math.ceil(Math.max(...totals) / 2) * 2;
  const H = 220, W = 100 / data.length;

  return (
    <div>
      <div className="relative h-[240px] flex">
        <div className="flex flex-col justify-between text-[11px] text-slate-400 pr-2 pb-5 text-right w-8">
          {[max, max * 0.75, max * 0.5, max * 0.25, 0].map((v) => <span key={v}>{v.toFixed(v % 1 ? 1 : 0)}</span>)}
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 bottom-5 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => <div key={i} className="border-t border-dashed border-slate-200" />)}
          </div>
          <div className="absolute inset-0 bottom-5 flex items-end">
            {data.map((d, i) => (
              <div
                key={i}
                className="relative h-full flex flex-col justify-end items-center"
                style={{ width: `${W}%` }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="w-[55%] max-w-9 flex flex-col-reverse rounded-t-md overflow-hidden" style={{ height: `${(totals[i] / max) * 100}%` }}>
                  {series.map((s) => (
                    <div key={s.key} style={{ height: `${(Number(d[s.key]) / totals[i]) * 100}%`, background: s.color, opacity: hover === null || hover === i ? 1 : 0.45 }} className="transition-opacity" />
                  ))}
                </div>
                {hover === i && (
                  <div className="absolute z-10 bottom-full mb-2 w-44 rounded-xl bg-slate-900 text-white text-xs p-3 shadow-lg pointer-events-none" style={{ bottom: `${(totals[i] / max) * H}px` }}>
                    <div className="font-medium mb-1">{String(d[xKey])}</div>
                    {series.map((s) => (
                      <div key={s.key} className="flex items-center gap-2">
                        <span className="size-2 rounded-full" style={{ background: s.color }} />
                        <span className="flex-1 text-slate-300">{s.label}</span>
                        <span>{Number(d[s.key]).toFixed(1)}{unit}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 mt-1 pt-1 flex justify-between font-medium">
                      <span>รวม</span><span>{totals[i].toFixed(1)}{unit}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 flex">
            {data.map((d, i) => (
              <div key={i} className="text-[11px] text-slate-400 text-center" style={{ width: `${W}%` }}>{String(d[xKey])}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm" style={{ background: s.color }} />{s.label}</span>
        ))}
      </div>
    </div>
  );
}

// กราฟโดนัท
export function Donut({ items, center }: { items: { label: string; value: number; color: string }[]; center?: React.ReactNode }) {
  const total = items.reduce((s, i) => s + i.value, 0);
  const R = 40, C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <div className="relative size-40 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="14" />
          {items.map((it) => {
            const len = (it.value / total) * C;
            const el = (
              <circle key={it.label} cx="50" cy="50" r={R} fill="none" stroke={it.color} strokeWidth="14"
                strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">{center}</div>
      </div>
      <div className="space-y-2 text-sm flex-1">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-sm" style={{ background: it.color }} />
            <span className="flex-1 text-slate-600">{it.label}</span>
            <span className="font-medium">{((it.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// กราฟเส้นเล็ก (Sparkline / Area)
export function AreaLine({ values, color = "#6366f1", height = 120, labels }: { values: number[]; color?: string; height?: number; labels?: string[] }) {
  const max = Math.max(...values) * 1.1, min = Math.min(...values) * 0.9;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 100 - ((v - min) / (max - min)) * 100]);
  const line = pts.map((p) => p.join(",")).join(" ");
  const id = `g${color.replace("#", "")}`;
  return (
    <div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} className="w-full">
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${line} 100,100`} fill={`url(#${id})`} />
        <polyline points={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {labels && (
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          {labels.map((l) => <span key={l}>{l}</span>)}
        </div>
      )}
    </div>
  );
}
