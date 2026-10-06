import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "NexERP AI — ระบบ ERP สำหรับธุรกิจซอฟต์แวร์ & Cloud",
  description: "Demo ระบบ ERP + AI สำหรับบริษัทพัฒนาซอฟต์แวร์ ขาย Hardware และบริการ On Cloud",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
