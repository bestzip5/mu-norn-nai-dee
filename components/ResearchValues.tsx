import type { Evidence } from "@/data/dormitory-research";

export default function ResearchValues({ values }: { values: Evidence[] }) {
  if (!values.length) return <p className="text-sm text-muted">Not available</p>;
  return <ul className="space-y-3">{values.map((item, index) => (
    <li key={`${item.sourceUrl}-${index}`} className="text-sm leading-6">
      <p className="font-medium break-words">{item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">{item.value}</a> : item.value}</p>
      <p><span className={`inline-block rounded px-2 text-xs ${item.status === "Verified" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>{item.status}</span></p>
      {item.note && <p className="text-muted">{item.note}</p>}
      <p className="text-xs text-muted"><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">แหล่งข้อมูล</a>{" · ตรวจเมื่อ "}{item.checkedOn}</p>
    </li>
  ))}</ul>;
}
