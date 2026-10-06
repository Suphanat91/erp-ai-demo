// ข้อมูลจำลองสำหรับ Demo — บริษัทพัฒนาซอฟต์แวร์ / AI / ERP / Hardware / Cloud

export const company = {
  name: "บริษัท เน็กซ์เทค โซลูชั่นส์ จำกัด",
  nameEn: "NexTech Solutions Co., Ltd.",
  taxId: "0105565012345",
};

export const monthlyRevenue = [
  { m: "ม.ค.", software: 2.1, hardware: 1.2, cloud: 0.8, service: 0.6 },
  { m: "ก.พ.", software: 2.4, hardware: 0.9, cloud: 0.9, service: 0.7 },
  { m: "มี.ค.", software: 2.8, hardware: 1.5, cloud: 1.0, service: 0.8 },
  { m: "เม.ย.", software: 2.2, hardware: 1.1, cloud: 1.1, service: 0.7 },
  { m: "พ.ค.", software: 3.1, hardware: 1.4, cloud: 1.2, service: 0.9 },
  { m: "มิ.ย.", software: 3.4, hardware: 1.8, cloud: 1.3, service: 1.0 },
  { m: "ก.ค.", software: 3.0, hardware: 1.3, cloud: 1.5, service: 0.9 },
  { m: "ส.ค.", software: 3.6, hardware: 1.6, cloud: 1.6, service: 1.1 },
  { m: "ก.ย.", software: 4.1, hardware: 2.0, cloud: 1.8, service: 1.2 },
];

export type LeadStage = "lead" | "qualified" | "proposal" | "negotiation" | "won";

export const stages: { key: LeadStage; label: string }[] = [
  { key: "lead", label: "ลูกค้าเป้าหมาย" },
  { key: "qualified", label: "ผ่านการคัดกรอง" },
  { key: "proposal", label: "เสนอราคา" },
  { key: "negotiation", label: "เจรจาต่อรอง" },
  { key: "won", label: "ปิดการขาย" },
];

export type Lead = {
  id: string;
  company: string;
  contact: string;
  interest: string;
  value: number;
  stage: LeadStage;
  owner: string;
  aiScore: number;
};

export const leads: Lead[] = [
  { id: "L-1001", company: "บมจ. สยามรีเทล", contact: "คุณสมชาย", interest: "ERP + On Cloud", value: 2800000, stage: "negotiation", owner: "วิภา", aiScore: 88 },
  { id: "L-1002", company: "โรงพยาบาลเมดิแคร์", contact: "นพ.ธนา", interest: "AI วิเคราะห์ภาพ X-Ray", value: 4500000, stage: "proposal", owner: "กิตติ", aiScore: 76 },
  { id: "L-1003", company: "บจ. ไทยโลจิสติกส์", contact: "คุณอรุณี", interest: "ระบบติดตามขนส่ง + IoT", value: 1900000, stage: "qualified", owner: "วิภา", aiScore: 64 },
  { id: "L-1004", company: "มหาวิทยาลัยราชพฤกษ์", contact: "ผศ.ดร.ปรีชา", interest: "Server + Cloud Migration", value: 3200000, stage: "lead", owner: "ณัฐ", aiScore: 52 },
  { id: "L-1005", company: "บจ. กรีนฟาร์ม", contact: "คุณมาลี", interest: "ซอฟต์แวร์บัญชีสำเร็จรูป", value: 350000, stage: "won", owner: "กิตติ", aiScore: 95 },
  { id: "L-1006", company: "เทศบาลนครนนท์", contact: "คุณวีระ", interest: "AI Chatbot บริการประชาชน", value: 1200000, stage: "proposal", owner: "ณัฐ", aiScore: 71 },
  { id: "L-1007", company: "บจ. ออโต้พาร์ท", contact: "คุณเกรียงไกร", interest: "ERP โรงงาน (MRP)", value: 3900000, stage: "qualified", owner: "วิภา", aiScore: 69 },
  { id: "L-1008", company: "ร้านกาแฟ ดอยช้าง สาขา", contact: "คุณนภา", interest: "POS + Hardware ครบชุด", value: 280000, stage: "lead", owner: "กิตติ", aiScore: 58 },
  { id: "L-1009", company: "บจ. ฟินเทคไทย", contact: "คุณพงศ์", interest: "Private Cloud + Security", value: 5200000, stage: "negotiation", owner: "ณัฐ", aiScore: 82 },
  { id: "L-1010", company: "โรงเรียนนานาชาติ BIS", contact: "Mr. John", interest: "ระบบโรงเรียน (SaaS)", value: 650000, stage: "won", owner: "วิภา", aiScore: 91 },
];

export type ProjectStatus = "planning" | "dev" | "testing" | "deploy" | "done";

export const projectStatusLabel: Record<ProjectStatus, string> = {
  planning: "วางแผน",
  dev: "กำลังพัฒนา",
  testing: "ทดสอบ (UAT)",
  deploy: "ติดตั้ง/Go-Live",
  done: "เสร็จสิ้น",
};

export type Project = { id: string; name: string; client: string; type: string; status: ProjectStatus; progress: number; budget: number; spent: number; due: string; pm: string; team: number; sprint: string };

export const projects: Project[] = [
  { id: "PRJ-24-018", name: "ERP สยามรีเทล (Phase 1)", client: "บมจ. สยามรีเทล", type: "ERP", status: "dev", progress: 62, budget: 2800000, spent: 1540000, due: "2026-12-15", pm: "อนันต์", team: 6, sprint: "Sprint 7/12" },
  { id: "PRJ-24-021", name: "AI ตรวจจับคุณภาพสินค้า (Vision)", client: "บจ. ไทยแพ็คเกจจิ้ง", type: "AI", status: "testing", progress: 85, budget: 1800000, spent: 1420000, due: "2026-10-30", pm: "ศิริพร", team: 4, sprint: "Sprint 9/10" },
  { id: "PRJ-24-025", name: "Mobile App สะสมแต้ม", client: "บจ. กรีนมาร์ท", type: "Application", status: "deploy", progress: 95, budget: 950000, spent: 880000, due: "2026-10-12", pm: "อนันต์", team: 3, sprint: "Go-Live" },
  { id: "PRJ-24-027", name: "Cloud Migration (AWS → Hybrid)", client: "มหาวิทยาลัยราชพฤกษ์", type: "Cloud", status: "planning", progress: 12, budget: 3200000, spent: 210000, due: "2027-03-01", pm: "ธีรวัฒน์", team: 5, sprint: "Discovery" },
  { id: "PRJ-24-029", name: "AI Chatbot LINE OA", client: "เทศบาลนครนนท์", type: "AI", status: "dev", progress: 40, budget: 1200000, spent: 560000, due: "2026-12-20", pm: "ศิริพร", team: 3, sprint: "Sprint 4/8" },
  { id: "PRJ-24-012", name: "ติดตั้ง Server + Network", client: "โรงพยาบาลเมดิแคร์", type: "Hardware", status: "done", progress: 100, budget: 2400000, spent: 2250000, due: "2026-08-30", pm: "ธีรวัฒน์", team: 4, sprint: "ส่งมอบแล้ว" },
  { id: "PRJ-24-031", name: "ระบบ HR & Payroll", client: "บจ. ออโต้พาร์ท", type: "ERP", status: "dev", progress: 28, budget: 780000, spent: 310000, due: "2027-01-31", pm: "อนันต์", team: 3, sprint: "Sprint 3/9" },
];

export type ProductCategory = "software" | "hardware" | "cloud" | "service";

export const categoryLabel: Record<ProductCategory, string> = {
  software: "ซอฟต์แวร์สำเร็จรูป",
  hardware: "ฮาร์ดแวร์",
  cloud: "Cloud / SaaS",
  service: "บริการ",
};

export type Product = { sku: string; name: string; category: ProductCategory; price: number; cost: number; stock: number | null; unit: string; sold: number };

export const products: Product[] = [
  { sku: "SW-ERP-STD", name: "NexERP Standard (License/ผู้ใช้)", category: "software", price: 25000, cost: 0, stock: null, unit: "License", sold: 148 },
  { sku: "SW-ACC-PRO", name: "NexAccount Pro โปรแกรมบัญชี", category: "software", price: 18900, cost: 0, stock: null, unit: "License", sold: 236 },
  { sku: "SW-POS-01", name: "NexPOS ระบบขายหน้าร้าน", category: "software", price: 9900, cost: 0, stock: null, unit: "License", sold: 412 },
  { sku: "SW-AI-OCR", name: "AI OCR อ่านเอกสาร/ใบกำกับภาษี", category: "software", price: 45000, cost: 0, stock: null, unit: "License", sold: 37 },
  { sku: "HW-SRV-DL380", name: "Server HPE ProLiant DL380 Gen11", category: "hardware", price: 385000, cost: 312000, stock: 4, unit: "เครื่อง", sold: 11 },
  { sku: "HW-NB-T14", name: "Notebook Lenovo ThinkPad T14", category: "hardware", price: 42900, cost: 35500, stock: 23, unit: "เครื่อง", sold: 186 },
  { sku: "HW-POS-SET", name: "ชุดเครื่อง POS (จอสัมผัส+ลิ้นชัก+พิมพ์)", category: "hardware", price: 28500, cost: 21000, stock: 3, unit: "ชุด", sold: 95 },
  { sku: "HW-FW-FG60", name: "Firewall Fortinet FortiGate 60F", category: "hardware", price: 36000, cost: 28800, stock: 8, unit: "เครื่อง", sold: 42 },
  { sku: "HW-GPU-L40S", name: "GPU NVIDIA L40S (สำหรับงาน AI)", category: "hardware", price: 495000, cost: 430000, stock: 2, unit: "การ์ด", sold: 6 },
  { sku: "CL-VPS-S", name: "Cloud VPS 4vCPU/8GB (รายเดือน)", category: "cloud", price: 1890, cost: 650, stock: null, unit: "เดือน", sold: 320 },
  { sku: "CL-ERP-SAAS", name: "NexERP Cloud SaaS (รายเดือน/ผู้ใช้)", category: "cloud", price: 890, cost: 120, stock: null, unit: "ผู้ใช้/เดือน", sold: 1850 },
  { sku: "CL-BACKUP", name: "Cloud Backup 1TB", category: "cloud", price: 1200, cost: 300, stock: null, unit: "เดือน", sold: 210 },
  { sku: "SV-MA-YEAR", name: "MA รายปี (Software + Hardware)", category: "service", price: 60000, cost: 18000, stock: null, unit: "ปี", sold: 64 },
  { sku: "SV-DEV-MD", name: "พัฒนาซอฟต์แวร์ตามสั่ง (Man-day)", category: "service", price: 8500, cost: 4200, stock: null, unit: "Man-day", sold: 1420 },
];

export const cloudServers = [
  { name: "erp-prod-01", client: "บมจ. สยามรีเทล", region: "TH-BKK-1", cpu: 72, ram: 64, disk: 48, status: "running", plan: "8 vCPU / 32GB" },
  { name: "ai-inference-gpu", client: "บจ. ไทยแพ็คเกจจิ้ง", region: "SG-1", cpu: 91, ram: 78, disk: 35, status: "warning", plan: "GPU L40S / 64GB" },
  { name: "saas-school-01", client: "โรงเรียน BIS", region: "TH-BKK-1", cpu: 34, ram: 41, disk: 22, status: "running", plan: "4 vCPU / 16GB" },
  { name: "chatbot-api", client: "เทศบาลนครนนท์", region: "TH-BKK-2", cpu: 18, ram: 30, disk: 15, status: "running", plan: "2 vCPU / 8GB" },
  { name: "backup-vault-02", client: "โรงพยาบาลเมดิแคร์", region: "TH-BKK-2", cpu: 8, ram: 12, disk: 83, status: "warning", plan: "Storage 5TB" },
  { name: "staging-dev", client: "ภายใน (Internal)", region: "TH-BKK-1", cpu: 0, ram: 0, disk: 40, status: "stopped", plan: "4 vCPU / 16GB" },
];

export const subscriptions = [
  { client: "บมจ. สยามรีเทล", plan: "NexERP Cloud Enterprise", users: 120, mrr: 106800, renew: "2027-01-01", status: "active" },
  { client: "โรงเรียนนานาชาติ BIS", plan: "School SaaS Pro", users: 85, mrr: 42500, renew: "2026-11-15", status: "active" },
  { client: "บจ. กรีนฟาร์ม", plan: "NexAccount Cloud", users: 8, mrr: 7120, renew: "2026-10-20", status: "renewal" },
  { client: "คลินิกทันตกรรมยิ้มสวย", plan: "Clinic SaaS Basic", users: 5, mrr: 3450, renew: "2026-10-09", status: "overdue" },
  { client: "บจ. ไทยแพ็คเกจจิ้ง", plan: "AI Vision API + GPU", users: 0, mrr: 89000, renew: "2027-06-30", status: "active" },
  { client: "บจ. ฟาสต์ฟู้ดไทย (12 สาขา)", plan: "NexPOS Cloud", users: 36, mrr: 32040, renew: "2026-12-01", status: "active" },
];

export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

export type Invoice = { no: string; client: string; desc: string; amount: number; date: string; due: string; status: InvoiceStatus };

export const invoices: Invoice[] = [
  { no: "INV-2609-0142", client: "บมจ. สยามรีเทล", desc: "ERP Phase 1 งวดที่ 2 (30%)", amount: 840000, date: "2026-09-28", due: "2026-10-28", status: "pending" },
  { no: "INV-2609-0141", client: "โรงพยาบาลเมดิแคร์", desc: "Server HPE DL380 x2 + ติดตั้ง", amount: 812000, date: "2026-09-25", due: "2026-10-25", status: "paid" },
  { no: "INV-2609-0139", client: "บจ. ไทยแพ็คเกจจิ้ง", desc: "AI Vision API + GPU Cloud (ก.ย.)", amount: 89000, date: "2026-09-20", due: "2026-10-05", status: "overdue" },
  { no: "INV-2609-0137", client: "บจ. กรีนมาร์ท", desc: "Mobile App งวดสุดท้าย", amount: 285000, date: "2026-09-18", due: "2026-10-18", status: "pending" },
  { no: "INV-2609-0133", client: "โรงเรียนนานาชาติ BIS", desc: "School SaaS Pro (ก.ย.)", amount: 42500, date: "2026-09-01", due: "2026-09-15", status: "paid" },
  { no: "INV-2609-0130", client: "บจ. ฟาสต์ฟู้ดไทย", desc: "ชุด POS x12 + License", amount: 460800, date: "2026-08-30", due: "2026-09-30", status: "paid" },
  { no: "INV-2609-0128", client: "คลินิกทันตกรรมยิ้มสวย", desc: "Clinic SaaS Basic (ส.ค.-ก.ย.)", amount: 6900, date: "2026-08-15", due: "2026-09-15", status: "overdue" },
  { no: "INV-2610-0001", client: "บจ. กรีนฟาร์ม", desc: "NexAccount Pro x5 + อบรม", amount: 112000, date: "2026-10-03", due: "2026-11-02", status: "draft" },
];

export const employees = [
  { name: "อนันต์ ศรีสุข", role: "Project Manager", dept: "PMO", util: 92, skills: ["ERP", "Scrum"], status: "active" },
  { name: "ศิริพร ใจดี", role: "AI Lead", dept: "AI Lab", util: 88, skills: ["Python", "LLM", "Vision"], status: "active" },
  { name: "ธีรวัฒน์ กล้าหาญ", role: "Cloud Architect", dept: "Infra", util: 76, skills: ["AWS", "K8s", "Network"], status: "active" },
  { name: "ปิยะ วงศ์ทอง", role: "Senior Full-stack Dev", dept: "Engineering", util: 95, skills: ["Next.js", "Go", "PostgreSQL"], status: "active" },
  { name: "กนกวรรณ แสงทอง", role: "Mobile Developer", dept: "Engineering", util: 81, skills: ["Flutter", "Kotlin"], status: "active" },
  { name: "ณัฐพล มีชัย", role: "Sales Manager", dept: "Sales", util: 70, skills: ["B2B", "Gov"], status: "active" },
  { name: "วิภา รุ่งเรือง", role: "Account Executive", dept: "Sales", util: 74, skills: ["ERP", "SaaS"], status: "leave" },
  { name: "ชยพล บุญมา", role: "QA Engineer", dept: "Engineering", util: 66, skills: ["Playwright", "UAT"], status: "active" },
  { name: "สุดารัตน์ ทองดี", role: "Hardware Technician", dept: "Infra", util: 58, skills: ["Server", "CCTV", "Network"], status: "active" },
  { name: "เอกชัย นาคสวัสดิ์", role: "Data Scientist", dept: "AI Lab", util: 84, skills: ["ML", "Forecasting"], status: "active" },
];

export type TicketPriority = "critical" | "high" | "medium" | "low";

export type Ticket = { id: string; client: string; subject: string; priority: TicketPriority; status: string; sla: string; assignee: string; channel: string };

export const tickets: Ticket[] = [
  { id: "TK-3381", client: "บจ. ไทยแพ็คเกจจิ้ง", subject: "AI Inference latency สูงผิดปกติ", priority: "critical", status: "open", sla: "1 ชม.", assignee: "ศิริพร", channel: "Hotline" },
  { id: "TK-3379", client: "บมจ. สยามรีเทล", subject: "รายงานสต็อกไม่ตรงกับยอดขาย POS", priority: "high", status: "in-progress", sla: "4 ชม.", assignee: "ปิยะ", channel: "Email" },
  { id: "TK-3376", client: "โรงพยาบาลเมดิแคร์", subject: "Backup storage ใกล้เต็ม (83%)", priority: "medium", status: "in-progress", sla: "1 วัน", assignee: "ธีรวัฒน์", channel: "Monitoring" },
  { id: "TK-3372", client: "บจ. กรีนฟาร์ม", subject: "ขอเพิ่มผู้ใช้งาน 3 คน", priority: "low", status: "open", sla: "2 วัน", assignee: "-", channel: "LINE OA" },
  { id: "TK-3368", client: "ร้านกาแฟ สาขาสีลม", subject: "เครื่องพิมพ์ใบเสร็จ POS ไม่ทำงาน", priority: "high", status: "open", sla: "4 ชม.", assignee: "สุดารัตน์", channel: "Hotline" },
  { id: "TK-3360", client: "โรงเรียน BIS", subject: "ขอปรับรูปแบบใบเกรด", priority: "low", status: "resolved", sla: "3 วัน", assignee: "กนกวรรณ", channel: "Portal" },
];

export const thb = (n: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(n);

export const num = (n: number) => new Intl.NumberFormat("th-TH").format(n);
