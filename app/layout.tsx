import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SupabaseAuthProvider from "@/components/SupabaseAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MU Norn Nai Dee | Dormitories around Salaya",
  description:
    "ค้นหาหอพักมหาวิทยาลัยมหิดล ศาลายา พร้อมคะแนน ค่าไฟ และการเดินทางจากรายงานโครงงาน MU นอนไหนดี ปีการศึกษา 2568",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SupabaseAuthProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:bg-white focus:p-4 focus:text-brand">ข้ามไปเนื้อหาหลัก</a>
          <SiteHeader />
          {children}
          <footer className="border-t border-line bg-white">
            <div className="page-container flex flex-wrap justify-between gap-2 py-5 text-xs leading-6 text-muted">
              <span>MU นอนไหนดี · โครงงานนักศึกษา</span>
              <span>คะแนนและค่าสาธารณูปโภค: รายงาน 68-330 · ราคาเช่าและติดต่อ: แหล่งข้อมูลในหน้ารายละเอียด</span>
            </div>
          </footer>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
