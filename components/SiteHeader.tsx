"use client";

import Link from "next/link";
import AccountMenu from "@/components/AccountMenu";

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-white sticky top-0 z-30">
      <div className="page-container pt-4 pb-3.5 sm:flex sm:min-h-20 sm:items-center sm:justify-between sm:gap-4 sm:py-4">
        {/* Top row on mobile, left logo on desktop */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-xl font-bold tracking-tight text-brand-dark shrink-0 sm:text-lg">
            MU นอนไหนดี
          </Link>
          <div className="sm:hidden">
            <AccountMenu />
          </div>
        </div>

        {/* Navigation: centered and spaced down on mobile, inline on desktop */}
        <nav
          aria-label="เมนูหลัก"
          className="mt-3.5 flex items-center justify-center gap-2 sm:gap-6 text-sm font-medium sm:mt-0 lg:gap-8"
        >
          <Link
            href="/dorms"
            className="rounded-lg px-2.5 py-1 text-foreground transition-colors hover:bg-brand-soft hover:text-brand"
          >
            ค้นหาหอพัก
          </Link>
          <Link
            href="/compare"
            className="rounded-lg px-2.5 py-1 text-foreground transition-colors hover:bg-brand-soft hover:text-brand"
          >
            เปรียบเทียบหอพัก
          </Link>
          <Link
            href="/#survey-source"
            className="rounded-lg px-2.5 py-1 text-muted transition-colors hover:bg-brand-soft hover:text-brand"
          >
            ที่มาข้อมูล
          </Link>
        </nav>

        {/* Account menu on desktop */}
        <div className="hidden sm:block">
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
