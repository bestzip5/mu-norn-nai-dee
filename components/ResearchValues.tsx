import type { Evidence } from "@/data/dormitory-research";
import { isBrokenSource, isNoteSource } from "@/lib/broken-sources";

export default function ResearchValues({ values }: { values: Evidence[] }) {
  if (!values.length) return <p className="text-sm text-muted">Not available (ไม่มีข้อมูลยืนยันจากแหล่งทางการ)</p>;
  return <ul className="space-y-3">{values.map((item, index) => (
    <li key={`${item.sourceUrl}-${index}`} className="text-sm leading-6">
      <p className="font-medium break-words">
        {item.href && !isBrokenSource(item.href) ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">{item.value}</a>
        ) : (
          item.value
        )}
      </p>
      {item.status === "Verified" && <p><span className="inline-block rounded bg-emerald-50 px-2 text-xs text-emerald-800">Verified</span></p>}
      {item.note && <p className="text-muted">{item.note}</p>}
      <p className="text-xs text-muted">
        {isBrokenSource(item.sourceUrl) ? null : isNoteSource(item.sourceUrl) ? (
          <span className="text-muted">แหล่งข้อมูล (บันทึกข้อมูล) · </span>
        ) : (
          <>
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">แหล่งข้อมูล</a>
            {" · "}
          </>
        )}
        {"ตรวจเมื่อ "}{item.checkedOn}
      </p>
    </li>
  ))}</ul>;
}
