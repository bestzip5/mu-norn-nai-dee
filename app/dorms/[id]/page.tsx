import Link from "next/link";
import { notFound } from "next/navigation";
import DormPhoto from "@/components/DormPhoto";
import ResearchValues from "@/components/ResearchValues";
import { dormitories, dormitoryAreas } from "@/data/dormitories";
import { dormitoryResearch } from "@/data/dormitory-research";

export default async function DormDetailPage({ params }: PageProps<"/dorms/[id]">) {
  const { id } = await params;
  const dorm = dormitories.find((item) => item.id === id);
  if (!dorm) notFound();
  const research = dormitoryResearch[id];
  const offers = research.roomOffers.length ? research.roomOffers : [{ roomType: [], rent: [], deposit: [], moveInCost: [] }];
  return (
    <main id="main-content" className="bg-surface pb-12">
      <div className="page-container py-8">
        <Link href="/dorms" className="text-sm text-brand hover:underline">← กลับไปค้นหาหอพัก</Link>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{dorm.name}</h1>
        <p className="mt-2 text-sm text-muted">{dormitoryAreas.find((item) => item.value === dorm.area)?.label} · ความพึงพอใจ {dorm.overallRating.toFixed(1)} / 5</p>
        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white"><DormPhoto dormitoryId={id} large /></div>
        <p className="mt-4 text-sm leading-7 text-muted">{research.identityNote}</p>
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Verified หมายถึงตรวจพบจากแหล่งข้อมูลทางการของหอพักหรือมหาวิทยาลัย ส่วน Needs verification ยังต้องยืนยันกับหอพัก โดยเฉพาะราคาที่ไม่ระบุวันมีผลหรือข้อมูลที่ขัดแย้งกัน วันที่ตรวจข้อมูลไม่ใช่วันที่ประกาศราคา</p>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-xl border border-line bg-white p-5 sm:p-6" aria-labelledby="rental-heading">
            <h2 id="rental-heading" className="text-xl font-bold">ข้อมูลค่าเช่า · Rental Information</h2>
            <p className="mt-2 text-sm leading-6 text-muted">ราคาแยกตามประเภทห้องและเงื่อนไขของแต่ละแหล่ง ค่ารายเทอมคงรอบชำระตามประกาศ ไม่มีการแปลงเป็นรายเดือน</p>
            {offers.map((offer, index) => <dl key={index} className="mt-5 space-y-4 rounded-lg border border-line p-4">
              {[
                { label: "ประเภทห้อง · Room type", values: offer.roomType },
                { label: "ค่าเช่ารายเดือน · Monthly rent", values: offer.rent.filter((item) => /เดือน|month/i.test(item.value)) },
                ...(offer.rent.some((item) => !/เดือน|month/i.test(item.value)) ? [{ label: "ค่าที่พักตามรอบชำระที่ประกาศ", values: offer.rent.filter((item) => !/เดือน|month/i.test(item.value)) }] : []),
                { label: "เงินประกัน · Deposit", values: offer.deposit },
                { label: "ค่าแรกเข้า / ชำระล่วงหน้า · Move-in cost", values: offer.moveInCost },
              ].map(({ label, values }) => <div key={label}><dt className="mb-1 text-sm font-semibold">{label}</dt><dd><ResearchValues values={values} /></dd></div>)}
            </dl>)}
            <dl className="mt-5 space-y-3 rounded-lg bg-brand-soft p-4 text-sm leading-6">
              <div><dt className="font-semibold">ค่าไฟ · Electricity rate</dt><dd>{dorm.electricityPrice} บาท / หน่วย</dd></div>
              <div><dt className="font-semibold">ค่าน้ำตามตาราง · Water rate</dt><dd>{dorm.waterPrice ?? "Not available"}</dd></div>
            </dl>
            <p className="mt-2 text-xs leading-6 text-muted">ค่าไฟและค่าน้ำจากรายงานเดิม หน้า {dorm.sourcePage} คงข้อความและตัวเลขตามตาราง ตัวเลขค่าน้ำที่ไม่ระบุรอบชำระยังไม่ทราบหน่วยคิด</p>
          </section>
          <section className="rounded-xl border border-line bg-white p-5 sm:p-6" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-xl font-bold">ติดต่อหอพัก · Contact Dormitory</h2>
            <dl className="mt-5 space-y-5">{([
              ["phone", "โทรศัพท์ · Phone"], ["line", "LINE"], ["facebook", "Facebook"], ["website", "Website"], ["googleMaps", "Google Maps"],
            ] as const).map(([key, label]) => <div key={key}><dt className="mb-1 text-sm font-semibold">{label}</dt><dd><ResearchValues values={research.contacts[key]} /></dd></div>)}</dl>
            <Link href={`/compare?first=${id}`} className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">เปรียบเทียบหอพักนี้</Link>
          </section>
        </div>
        <section className="mt-6 rounded-xl border border-line bg-white p-5 sm:p-6" aria-labelledby="source-heading">
          <h2 id="source-heading" className="text-xl font-bold">แหล่งข้อมูล · Source Information</h2>
          <p className="mt-2 text-sm text-muted">ตรวจข้อมูลล่าสุด · Last checked: 2026-10-05</p>
          <p className="mt-2 text-sm leading-6 text-muted">สถานะการยืนยันแสดงกำกับแต่ละค่าไว้ด้านบน ข้อมูลที่หาไม่พบแสดง Not available</p>
          {research.sources.length ? <ul className="mt-4 space-y-4 text-sm">{research.sources.map((source) => <li key={source.url} className="break-words">
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">{source.title}</a>
            <p className="mt-1 text-xs text-muted">{source.kind} · ตรวจเมื่อ {source.checkedOn}{source.publishedOn ? ` · วันที่ระบุในแหล่งข้อมูล ${source.publishedOn}` : " · ไม่ระบุวันที่เผยแพร่"}</p>
          </li>)}</ul> : <p className="mt-4 text-sm text-muted">Not available</p>}
          <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-muted">คะแนนจากรายงาน MU นอนไหนดี ปีการศึกษา 2568 หน้า {dorm.sourcePage} · ความปลอดภัย {dorm.safetyRating.toFixed(1)} / 5 · การเดินทาง: {dorm.transportationOptions.join(" · ")}</p>
        </section>
      </div>
    </main>
  );
}
