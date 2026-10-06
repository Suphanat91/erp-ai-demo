# NexERP AI — Demo ระบบ ERP สำหรับธุรกิจซอฟต์แวร์ / AI / Hardware / Cloud

ระบบสาธิต (Demo) สำหรับนำเสนอลูกค้า สร้างด้วย **Next.js 15 + Tailwind CSS 4** แบบ Static Export (ไม่ต้องมี Backend)
ข้อมูลทั้งหมดเป็นข้อมูลจำลอง

## โมดูลในระบบ
| เมนู | ความสามารถ |
|---|---|
| ภาพรวม (Dashboard) | KPI, กราฟรายได้แยกธุรกิจ, AI Insight, งานเร่งด่วน |
| AI ผู้ช่วยอัจฉริยะ | Chat ถาม-ตอบข้อมูลธุรกิจภาษาไทย (สรุปยอดขาย, พยากรณ์, ลูกหนี้, ความเสี่ยง) |
| CRM & การขาย | Kanban Pipeline (ลากวางได้), AI Lead Score, เพิ่มลูกค้าเป้าหมาย |
| โครงการพัฒนาซอฟต์แวร์ | Gantt Timeline, ความคืบหน้า/งบประมาณ, AI เตือนความเสี่ยง |
| สินค้า & คลัง | ซอฟต์แวร์สำเร็จรูป / Hardware / Cloud / บริการ, สร้างใบเสนอราคา + VAT |
| Cloud & Subscription | Monitoring เซิร์ฟเวอร์แบบ Live, MRR/ARR, แพ็กเกจ SaaS |
| บัญชี & ใบแจ้งหนี้ | ออกใบแจ้งหนี้, รับชำระ, ทวงถาม, AI พยากรณ์กระแสเงินสด |
| บุคลากร & ทรัพยากร | Utilization รายคน/แผนก, ทักษะทีม, AI แนะนำจัดสรรงาน |
| Helpdesk / Support | Ticket หลายช่องทาง, SLA, AI แนะนำวิธีแก้ไข |

## รันบนเครื่อง
```bash
npm install
npm run dev        # เปิด http://localhost:3000
```

## Deploy ขึ้น GitHub Pages (ฟรี)
1. สร้าง Repository ใหม่บน GitHub (เช่น `erp-ai-demo`)
2. Push โค้ดขึ้นไป
   ```bash
   git remote add origin https://github.com/<username>/erp-ai-demo.git
   git push -u origin main
   ```
3. ไปที่ **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**
4. รอ Action ทำงานเสร็จ (~1-2 นาที) จะได้ลิงก์ `https://<username>.github.io/erp-ai-demo/`

> ถ้าตั้งชื่อ Repository เป็น `<username>.github.io` ให้ลบบรรทัด `BASE_PATH` ใน `.github/workflows/deploy.yml`

## Deploy ขึ้น Vercel (ทางเลือก)
Import Repository ที่ https://vercel.com/new แล้วกด Deploy ได้เลย ไม่ต้องตั้งค่าเพิ่ม
