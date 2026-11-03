"use client";

import Link from "next/link";
import { useState } from "react";
import { dormitories, dormitoryAreas } from "@/data/dormitories";
import { compareDormitories } from "@/lib/dorm-comparison";

type DormComparisonProps = {
  initialFirstId: string;
  initialSecondId: string;
  initialNotice: string;
};

export default function DormComparison({ initialFirstId, initialSecondId, initialNotice }: DormComparisonProps) {
  const [firstId, setFirstId] = useState(initialFirstId);
  const [secondId, setSecondId] = useState(initialSecondId);
  const [notice, setNotice] = useState(initialNotice);
  const first = dormitories.find((dorm) => dorm.id === firstId);
  const second = dormitories.find((dorm) => dorm.id === secondId);
  const rows = first && second && first.id !== second.id ? compareDormitories(first, second) : [];

  function clearSelection() {
    setFirstId("");
    setSecondId("");
    setNotice("");
  }

  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="bg-white">
        <div className="page-container py-8 sm:py-10">
          <h1 className="text-2xl font-bold sm:text-3xl">เปรียบเทียบหอพัก</h1>
          <p className="mt-2 text-sm leading-7 text-muted">เลือกหอพัก 2 แห่ง เพื่อเทียบค่าใช้จ่าย การเดินทาง และคะแนนจากนักศึกษา</p>
        </div>
      </section>

      <div className="page-container py-8">
        <section aria-label="เลือกหอพักสำหรับเปรียบเทียบ" className="rounded-xl border border-line bg-white p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: "first-dorm", label: "หอพักแห่งที่ 1", value: firstId, otherId: secondId, setValue: setFirstId },
              { id: "second-dorm", label: "หอพักแห่งที่ 2", value: secondId, otherId: firstId, setValue: setSecondId },
            ].map((selector) => (
              <div key={selector.id}>
                <label htmlFor={selector.id} className="mb-2 block text-sm font-semibold">{selector.label}</label>
                <select id={selector.id} value={selector.value} onChange={(event) => { selector.setValue(event.target.value); setNotice(""); }} className="w-full min-w-0 rounded-lg border border-line bg-brand-soft px-3 py-3 text-sm">
                  <option value="">เลือกหอพัก</option>
                  {dormitoryAreas.map((area) => (
                    <optgroup key={area.value} label={area.label}>
                      {dormitories.filter((dorm) => dorm.area === area.value).map((dorm) => (
                        <option key={dorm.id} value={dorm.id} disabled={dorm.id === selector.otherId}>{dorm.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <button type="button" disabled={!first || !second} onClick={() => { setFirstId(secondId); setSecondId(firstId); }} className="font-medium text-brand hover:underline disabled:cursor-not-allowed disabled:text-muted">สลับหอพัก</button>
            <button type="button" onClick={clearSelection} className="font-medium text-brand hover:underline">ล้างการเลือก</button>
            {first && second && <Link href={`/compare?first=${first.id}&second=${second.id}`} className="font-medium text-brand hover:underline">เปิดลิงก์สำหรับคู่นี้</Link>}
          </div>
          {notice && <p role="status" className="mt-4 text-sm text-brand-dark">{notice}</p>}
        </section>

        <section aria-labelledby="comparison-heading" className="mt-6">
          <h2 id="comparison-heading" className="mb-3 text-lg font-semibold" aria-live="polite">
            {first && second ? `${first.name} เทียบกับ ${second.name}` : "เลือกหอพักให้ครบ 2 แห่ง"}
          </h2>
          {rows.length > 0 && first && second ? (
            <>
              <p className="mb-3 text-sm leading-6 text-muted">ช่องสีฟ้าแสดงค่าไฟที่ต่ำกว่าหรือคะแนนที่สูงกว่า · บนมือถือเลื่อนตารางไปทางซ้ายและขวาได้</p>
              <div role="region" aria-label="ตารางเปรียบเทียบหอพัก เลื่อนแนวนอนได้" tabIndex={0} className="overflow-x-auto rounded-xl border border-line bg-white">
                <table className="w-full min-w-[580px] table-fixed text-left text-sm">
                  <caption className="sr-only">เปรียบเทียบ {first.name} และ {second.name} จากรายงานปีการศึกษา 2568</caption>
                  <thead className="bg-brand-soft text-brand-dark">
                    <tr>
                      <th scope="col" className="w-1/3 p-4 font-semibold">ข้อมูล</th>
                      <th scope="col" className="p-4 font-semibold">{first.name}</th>
                      <th scope="col" className="p-4 font-semibold">{second.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label} className="border-t border-line">
                        <th scope="row" className="p-4 font-medium text-muted">{row.label}{row.note === "เท่ากัน" && <span className="mt-1 block text-xs font-normal">เท่ากัน</span>}</th>
                        <td className={`p-4 leading-6 ${row.preferred === "first" ? "bg-brand-soft font-semibold text-brand-dark" : "text-foreground"}`}>
                          {row.firstValue}
                          {row.preferred === "first" && <span className="mt-1 block text-xs font-normal">{row.note}</span>}
                        </td>
                        <td className={`p-4 leading-6 ${row.preferred === "second" ? "bg-brand-soft font-semibold text-brand-dark" : "text-foreground"}`}>
                          {row.secondValue}
                          {row.preferred === "second" && <span className="mt-1 block text-xs font-normal">{row.note}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {[first, second].filter((dorm) => dorm.sourceNote).map((dorm) => (
                <p key={dorm.id} className="mt-3 text-sm leading-6 text-muted">หมายเหตุ {dorm.name}: {dorm.sourceNote}</p>
              ))}
              {[first, second].filter((dorm) => dorm.id === "triple-a").map((dorm) => (
                <p key={`${dorm.id}-water`} className="mt-3 text-sm leading-6 text-muted">หมายเหตุ {dorm.name}: ค่าน้ำ 15 ในตารางเปรียบเทียบมาจากรายงานเดิม; ประกาศอีกแหล่งระบุ 25 บาท/หน่วย ดูแหล่งข้อมูลในหน้ารายละเอียด</p>
              ))}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">{[first, second].map((dorm) => <Link key={dorm.id} href={`/dorms/${dorm.id}`} className="text-brand underline underline-offset-2">ดูราคาเช่าและติดต่อ {dorm.name}</Link>)}</div>
            </>
          ) : (
            <div className="rounded-xl border border-line bg-white px-6 py-10 text-center text-sm leading-7 text-muted">{first || second ? "เลือกหอพักอีก 1 แห่งจากเมนูด้านบนเพื่อเริ่มเปรียบเทียบ" : `เลือกจากหอพักทั้ง ${dormitories.length} แห่งในเมนูด้านบน หรือกดเปรียบเทียบจากการ์ดหอพัก`}</div>
          )}
        </section>

        <div className="mt-6 rounded-lg bg-white p-5 text-xs leading-6 text-muted">
          <p>คะแนนเป็นค่าเฉลี่ยเต็ม 5 จากแบบสอบถามปีการศึกษา 2568 รายงานไม่ได้ระบุจำนวนผู้ตอบแยกแต่ละหอพัก</p>
          <p>ค่าน้ำแสดงตามข้อความในตาราง โดย /เดือน และ /เทอมมีรอบคิดต่างกัน ตัวเลขอย่างเดียวไม่ได้ระบุรอบคิด</p>
          <p>ที่มา: รายงานโครงงาน MU นอนไหนดี หน้า 7–9</p>
        </div>
        <Link href="/dorms?area=all" className="mt-6 inline-block text-sm font-medium text-brand hover:underline">กลับไปค้นหาหอพัก →</Link>
      </div>
    </main>
  );
}
