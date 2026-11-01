"use client";

import Link from "next/link";
import { useState } from "react";
import AccountMenu from "@/components/AccountMenu";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-line bg-white sticky top-0 z-30">
      <div className="page-container flex min-h-16 items-center justify-between gap-4 py-3 sm:min-h-20 sm:py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand-dark shrink-0">
          MU นอนไหนดี
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="เมนูหลัก" className="hidden items-center gap-6 text-sm sm:flex lg:gap-8">
          <Link href="/dorms" className="hover:text-brand">ค้นหาหอพัก</Link>
          <Link href="/compare" className="hover:text-brand">เปรียบเทียบหอพัก</Link>
          <Link href="/#survey-source" className="hover:text-brand">ที่มาข้อมูล</Link>
        </nav>

        <div className="hidden sm:block ml-auto">
          <AccountMenu />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนูหลัก"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted hover:border-brand hover:text-brand sm:hidden"
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-line bg-white px-5 py-4 sm:hidden">
          <nav aria-label="เมนูมือถือ" className="flex flex-col gap-3 text-sm">
            <Link
              href="/dorms"
              onClick={() => setIsOpen(false)}
              className="rounded-lg py-2 font-medium text-foreground hover:text-brand"
            >
              ค้นหาหอพัก
            </Link>
            <Link
              href="/compare"
              onClick={() => setIsOpen(false)}
              className="rounded-lg py-2 font-medium text-foreground hover:text-brand"
            >
              เปรียบเทียบหอพัก
            </Link>
            <Link
              href="/#survey-source"
              onClick={() => setIsOpen(false)}
              className="rounded-lg py-2 font-medium text-muted hover:text-brand"
            >
              ที่มาข้อมูล
            </Link>
            <div className="border-t border-line pt-3 mt-1">
              <AccountMenu />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
