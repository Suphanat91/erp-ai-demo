# NexERP AI — ERP Demo for Software, AI, Hardware & Cloud Businesses

A sales demo of an AI-powered ERP system, built for companies that develop software and AI applications, sell packaged software and hardware, and offer on-cloud services.

Built with **Next.js 15 + Tailwind CSS 4** as a fully static export: no backend or database required. All data is mock data, and changes made in the UI reset on page reload.

**Live demo:** https://suphanat91.github.io/erp-ai-demo/

> The user interface is in Thai, as the demo targets Thai customers.

## Modules

| Module | Features |
|---|---|
| Dashboard | KPIs, revenue by business line, daily AI insight, action items |
| AI Assistant | Chat with business data in Thai: sales summary, forecasts, overdue receivables, project risk (scripted responses) |
| CRM & Sales | Drag-and-drop Kanban pipeline, AI lead scoring, add new leads |
| Projects | Gantt timeline, progress vs. budget burn, AI risk alerts |
| Products & Inventory | Packaged software, hardware, cloud plans and services; quotation builder with VAT |
| Cloud & Subscriptions | Live server monitoring, MRR/ARR, SaaS subscriptions |
| Finance & Invoices | Create invoices, record payments, send reminders, AI cash-flow forecast |
| HR & Resources | Utilization by person and department, team skills, AI staffing suggestions |
| Helpdesk / Support | Multi-channel tickets, SLA tracking, AI-suggested resolutions |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Build the static site into `out/`:

```bash
npm run build
```

## Project Structure

```
app/            Pages (one folder per module)
components/     Layout shell, UI primitives, SVG charts
lib/data.ts     Mock data and formatters
.github/        GitHub Pages deploy workflow
```

## Deployment

### GitHub Pages

Every push to `main` builds and deploys the site through GitHub Actions (`.github/workflows/deploy.yml`).

To set it up in a new repository:

1. Push the code to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The site will be available at `https://<username>.github.io/<repo-name>/`.

If the repository is named `<username>.github.io`, remove the `BASE_PATH` line from the workflow.

### Vercel

Import the repository at https://vercel.com/new and deploy. No extra configuration is needed.

## Customization

- Company name and all mock data: `lib/data.ts`
- Product name, logo and navigation: `components/Shell.tsx`
- Font: `app/layout.tsx` (Prompt via `next/font/google`)
- Brand colors: `app/globals.css`
