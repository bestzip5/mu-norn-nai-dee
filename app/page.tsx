import Link from "next/link";
import DormCard from "@/components/DormCard";
import { dormitories, dormitoryAreas, type DormitoryArea } from "@/data/dormitories";

const recommendedAreas: DormitoryArea[] = [
  "ในมหาวิทยาลัย",
  "หน้ามหาวิทยาลัย",
  "ซอยบ้านตั้งสิน",
];

export default function Home() {
  // Stable sorting keeps the report's order when overall ratings are tied.
  const recommendedDorms = recommendedAreas.flatMap((area) =>
    dormitories
      .filter((dorm) => dorm.area === area)
      .sort((a, b) => b.overallRating - a.overallRating)
      .slice(0, 1),
  );
  return (
    <main id="main-content">
      <section className="bg-brand-soft">
        <div className="page-container py-12 sm:py-16">
          <h1 className="max-w-3xl text-3xl leading-relaxed font-bold tracking-tight text-brand-dark sm:text-4xl">หาหอพักที่ใช่ ใกล้มหิดล</h1>
          <p className="mt-2 text-sm leading-7 text-muted sm:text-base">ค้นหาหอพักในศาลายา พร้อมข้อมูลจากนักศึกษาเพื่อช่วยคุณตัดสินใจ</p>
          <form action="/dorms" className="mt-7 flex max-w-3xl flex-col gap-3 sm:flex-row sm:rounded-xl sm:bg-white sm:p-3">
            <label htmlFor="home-search" className="sr-only">ค้นหาชื่อหอพัก</label>
            <input id="home-search" name="q" type="search" placeholder="ค้นหาชื่อหอพัก เช่น MU Condo" className="min-w-0 flex-1 rounded-lg border border-line bg-white px-4 py-3 text-sm sm:border-0" />
            <button type="submit" className="primary-button w-full sm:w-auto sm:min-w-36">ค้นหาหอพัก</button>
          </form>
        </div>
      </section>
      <section aria-labelledby="recommended-heading" className="bg-surface">
        <div className="page-container py-10 sm:py-12">
          <div className="mb-6">
            <h2 id="recommended-heading" className="text-xl font-bold">หอพักแนะนำ</h2>
            <p className="mt-2 text-sm leading-6 text-muted">เลือกหอพักจากหลายบริเวณรอบมหิดล ศาลายา</p>
            <p className="mt-1 text-xs leading-6 text-muted">เลือกจากคะแนนความพึงพอใจโดยรวมสูงสุดบริเวณละ 1 แห่ง หากคะแนนเท่ากันเลือกตามลำดับในรายงาน</p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedDorms.map((dormitory, index) => (
              <li key={dormitory.id}><DormCard dormitory={dormitory} eager={index < 3} /></li>
            ))}
          </ul>
          <Link href="/dorms?area=all" className="mt-6 inline-block text-sm font-medium text-brand hover:underline">ดูหอพักทั้งหมด <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <section aria-labelledby="areas-heading" className="border-t border-line bg-white">
        <div className="page-container py-10">
          <h2 id="areas-heading" className="text-xl font-bold">เลือกหอพักตามบริเวณ</h2>
          <p className="mt-2 text-sm text-muted">ครบ {dormitories.length} หอพักตามรายงาน เริ่มจากบริเวณในมหาวิทยาลัย</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dormitoryAreas.map((area) => (
              <li key={area.value}>
                <Link href={`/dorms?area=${encodeURIComponent(area.value)}`} className="flex h-full items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 hover:border-brand">
                  <span className="text-sm font-medium">{area.label}</span>
                  <span className="shrink-0 text-sm text-brand">{dormitories.filter((dorm) => dorm.area === area.value).length} หอพัก →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="survey-source" aria-labelledby="source-heading" className="border-t border-line bg-white">
        <div className="page-container py-8">
          <h2 id="source-heading" className="text-sm font-semibold">ข้อมูลจากโครงงาน MU นอนไหนดี</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
            แบบสอบถามนักศึกษามหาวิทยาลัยมหิดล ชั้นปีที่ 1 ปีการศึกษา 2568 จำนวน 103 คน
            ข้อมูลหอพักที่แสดงคัดจากตารางหน้า 7–9 ของรายงาน คะแนนเป็นค่าเฉลี่ยเต็ม 5 คะแนน
            จำนวน 103 คนเป็นผู้ตอบแบบสอบถามทั้งหมด โดยรายงานไม่ได้ระบุจำนวนผู้ตอบแยกแต่ละหอพัก
          </p>
          <p className="mt-2 text-xs leading-6 text-muted">รูปอาจเป็นภาพในอดีตหรือห้องตัวอย่าง หอพักที่ยังไม่มีรูปที่ยืนยันได้ใช้ภาพประกอบ ข้อมูลค่าไฟและคะแนนอ้างอิงรายงานปีการศึกษา 2568</p>
        </div>
      </section>
    </main>
  );
}
