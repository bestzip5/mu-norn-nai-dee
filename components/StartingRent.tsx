import { dormitoryResearch } from "@/data/dormitory-research";
import { getStartingRents } from "@/lib/starting-rent";
import { isBrokenSource, isNoteSource } from "@/lib/broken-sources";

export default function StartingRent({ dormitoryId, compact = false }: { dormitoryId: string; compact?: boolean }) {
  const prices = getStartingRents(dormitoryResearch[dormitoryId]);

  if (compact) {
    return (
      <div className="space-y-1 text-sm leading-6">
        {prices.length ? prices.map((price) => (
          <div key={price.unit}>
            <p className="text-muted">
              <span className="text-lg font-bold text-brand-dark">{price.amount.toLocaleString("th-TH")}{price.maximumAmount > price.amount ? ` – ${price.maximumAmount.toLocaleString("th-TH")}` : ""}</span>
              {` บาท / ${price.unit}`}
            </p>
          </div>
        )) : <p className="text-xs text-muted">ราคาเริ่มต้น: Not available (ไม่มีข้อมูลยืนยันจากแหล่งทางการ)</p>}
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg bg-brand-soft p-3">
      {prices.length ? prices.map((price) => (
        <div key={price.unit} className="text-sm leading-6">
          <p className="font-semibold text-brand-dark">เริ่มต้น {price.amount.toLocaleString("th-TH")} บาท / {price.unit}</p>
          <p className="text-xs text-muted">
            {isBrokenSource(price.evidence.sourceUrl) ? null : isNoteSource(price.evidence.sourceUrl) ? (
              <span className="text-muted">แหล่งราคา (บันทึกข้อมูล) · </span>
            ) : (
              <>
                <a href={price.evidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">แหล่งราคา</a>
                {" · "}
              </>
            )}
            {`ตรวจเมื่อ ${price.evidence.checkedOn}`}
          </p>
        </div>
      )) : <p className="text-sm text-muted">ราคาเริ่มต้น: Not available (ไม่มีข้อมูลยืนยันจากแหล่งทางการ)</p>}
      {prices.length > 0 && <p className="mt-1 text-xs leading-5 text-muted">ราคาต่ำสุดตามข้อมูลที่พบ อาจต่างตามแหล่งข้อมูล ประเภทห้องและสัญญา ดูเงื่อนไขในรายละเอียด</p>}
    </div>
  );
}
