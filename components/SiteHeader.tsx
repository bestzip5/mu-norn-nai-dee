import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="page-container flex min-h-20 flex-wrap items-center justify-between gap-3 py-4 sm:justify-start sm:gap-14">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand-dark">MU นอนไหนดี</Link>
        <nav aria-label="เมนูหลัก" className="flex items-center gap-6 text-sm sm:gap-10">
          <Link href="/dorms" className="hover:text-brand">ค้นหาหอพัก</Link>
          <Link href="/compare" className="hover:text-brand">เปรียบเทียบหอพัก</Link>
          <Link href="/#survey-source" className="hidden hover:text-brand sm:block">ที่มาข้อมูล</Link>
        </nav>
        <span className="hidden text-xs text-muted lg:block">หอพักมหาวิทยาลัยมหิดล · ศาลายา</span>
      </div>
    </header>
  );
}
