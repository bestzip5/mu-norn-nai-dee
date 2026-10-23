import { dormitoryAreas, type Dormitory } from "@/data/dormitories";
import DormPhoto from "@/components/DormPhoto";
import StartingRent from "@/components/StartingRent";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";

type DormCardProps = {
  dormitory: Dormitory;
  eager?: boolean;
};

export default function DormCard({ dormitory, eager = false }: DormCardProps) {
  return (
    <article className="h-full overflow-hidden rounded-xl border border-line bg-white">
      <DormPhoto dormitoryId={dormitory.id} eager={eager} />
      <div className="p-4 sm:p-5">
        <div className="space-y-1">
          <h3 className="break-words text-base font-bold leading-7">{dormitory.name}</h3>
          <StartingRent dormitoryId={dormitory.id} compact />
        </div>
        <p className="mt-1 text-sm font-medium text-brand-dark">ค่าไฟ {dormitory.electricityPrice} บาท / หน่วย</p>
        <p className="mt-2 text-sm text-muted">{dormitoryAreas.find((area) => area.value === dormitory.area)?.label}</p>
        <p className="mt-2 text-sm text-muted">ค่าน้ำตามตาราง: {dormitory.waterPrice ?? "ไม่มีข้อมูลในรายงาน"}</p>
        <p className="mt-3 text-sm text-muted"><span aria-hidden="true" className="text-brand-dark">★ </span>ความพึงพอใจ {dormitory.overallRating.toFixed(1)} / 5</p>
        <p className="mt-1 text-sm text-muted">ความปลอดภัย {dormitory.safetyRating.toFixed(1)} / 5</p>
        <p className="mt-3 text-sm leading-6 text-muted">การเดินทาง: {dormitory.transportationOptions.join(" · ")}</p>
        <details className="mt-4 border-t border-line pt-3 text-sm">
          <summary className="cursor-pointer font-medium text-brand">ดูคะแนนทั้ง 5 ด้านและรายละเอียด</summary>
          <div className="mt-3 rounded-lg bg-surface p-3 text-sm leading-6 text-muted">
            <h4 className="mb-2 font-semibold text-foreground">คะแนนเฉลี่ยจากนักศึกษา (เต็ม 5)</h4>
            <dl className="space-y-2">
              {[
                { label: "ความปลอดภัย", rating: dormitory.safetyRating },
                { label: "ความสะอาด", rating: dormitory.cleanlinessRating },
                { label: "ความเป็นส่วนตัว", rating: dormitory.privacyRating },
                { label: "สิ่งอำนวยความสะดวก", rating: dormitory.facilitiesRating },
                { label: "ความพึงพอใจโดยรวม", rating: dormitory.overallRating },
              ].map(({ label, rating }) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt>{label}</dt>
                  <dd className="shrink-0 font-medium text-brand-dark">{rating.toFixed(1)} / 5</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4">ค่าน้ำคงข้อความตามตาราง ตัวเลขที่ไม่มี /เดือน หรือ /เทอม ไม่ได้ระบุรอบคิดในตาราง ส่วนช่องว่างหรือขีดไม่ได้หมายถึงฟรี</p>
            <p className="mt-3">ที่มา: รายงานโครงงาน MU นอนไหนดี หน้า {dormitory.sourcePage}</p>
            <p>คะแนนเป็นค่าเฉลี่ยจากแบบสอบถามปีการศึกษา 2568</p>
            <p>รายงานไม่ได้ระบุค่าเช่ารายเดือน ระยะทาง หรือจำนวนผู้ตอบรายหอพัก</p>
            {dormitory.sourceNote && <p className="mt-2 text-brand-dark">หมายเหตุ: {dormitory.sourceNote}</p>}
          </div>
        </details>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/dorms/${dormitory.id}`} className="inline-flex min-h-11 items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">ดูรายละเอียด</Link>
          <Link href={`/compare?first=${dormitory.id}`} className="inline-flex min-h-11 items-center rounded-lg border border-line px-4 py-2 text-sm font-medium text-brand hover:border-brand hover:bg-brand-soft">เปรียบเทียบ</Link>
          <FavoriteButton dormitoryId={dormitory.id} />
        </div>
      </div>
    </article>
  );
}
