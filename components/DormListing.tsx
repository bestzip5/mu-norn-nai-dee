"use client";

import { useState } from "react";
import { dormitories, dormitoryAreas, type DormitoryArea } from "@/data/dormitories";
import DormCard from "@/components/DormCard";

type DormListingProps = {
  initialQuery: string;
  initialArea?: DormitoryArea | "all";
};

export default function DormListing({ initialQuery, initialArea }: DormListingProps) {
  const [query, setQuery] = useState(initialQuery);
  const [area, setArea] = useState<DormitoryArea | "all">(initialArea ?? (initialQuery.trim() ? "all" : "ในมหาวิทยาลัย"));
  const [maxElectricity, setMaxElectricity] = useState("all");
  const [minSafety, setMinSafety] = useState("all");
  const [sort, setSort] = useState("electricity");

  const filteredDorms = dormitories
    .filter((dorm) => dorm.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
    .filter((dorm) => area === "all" || dorm.area === area)
    .filter((dorm) => maxElectricity === "all" || dorm.electricityPrice <= Number(maxElectricity))
    .filter((dorm) => minSafety === "all" || dorm.safetyRating >= Number(minSafety))
    .sort((a, b) => {
      if (sort === "rating") return b.overallRating - a.overallRating;
      return a.electricityPrice - b.electricityPrice;
    });

  function resetFilters() {
    setQuery("");
    setArea("ในมหาวิทยาลัย");
    setMaxElectricity("all");
    setMinSafety("all");
    setSort("electricity");
  }

  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="bg-white">
        <div className="page-container py-8 sm:py-10">
          <h1 className="text-2xl font-bold sm:text-3xl">ค้นหาหอพักใกล้มหิดล</h1>
          <p className="mt-2 text-sm leading-6 text-muted">ข้อมูล {dormitories.length} หอพักจากรายงาน แบ่งตาม 5 บริเวณ เริ่มจากหอพักในมหาวิทยาลัย</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="dorm-search" className="sr-only">ค้นหาชื่อหอพัก</label>
            <input id="dorm-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อหอพัก" className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm sm:max-w-3xl" />
            <label htmlFor="dorm-sort" className="sr-only">เรียงลำดับ</label>
            <select id="dorm-sort" aria-describedby="rent-sort-note" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-line bg-white px-4 py-3 text-sm">
              <option value="rent" disabled>ราคาหอพักต่ำสุดไปสูงสุด (ข้อมูลยังไม่ครบ)</option>
              <option value="electricity">ค่าไฟต่ำสุดไปสูงสุด</option>
              <option value="rating">ความพึงพอใจสูงสุด</option>
            </select>
          </div>
          <p id="rent-sort-note" className="mt-2 text-xs leading-6 text-muted">ดูราคาเช่าและแหล่งข้อมูลในหน้ารายละเอียด ข้อมูลยังไม่ครบและมีทั้งรายเดือน/รายเทอม จึงยังเรียงราคาข้ามหอพักไม่ได้</p>
        </div>
          <div className="page-container flex flex-wrap gap-2 pb-6" aria-label="เลือกบริเวณหอพัก">
            {[{ value: "all" as const, label: "ทุกบริเวณ" }, ...dormitoryAreas].map((option) => (
              <button key={option.value} type="button" aria-pressed={area === option.value} onClick={() => setArea(option.value)} className={`rounded-lg border px-3 py-2 text-sm ${area === option.value ? "border-brand bg-brand text-white" : "border-line bg-white text-muted hover:border-brand hover:text-brand"}`}>
                {option.label} ({option.value === "all" ? dormitories.length : dormitories.filter((dorm) => dorm.area === option.value).length})
              </button>
            ))}
          </div>
      </section>
      <div className="page-container grid items-start gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border border-line bg-white p-5" aria-label="ตัวกรองหอพัก">
          <details open>
            <summary className="cursor-pointer text-base font-bold">ตัวกรองหอพัก</summary>
            <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <label htmlFor="area" className="mb-2 block text-sm font-medium">บริเวณที่ตั้ง</label>
                <select id="area" value={area} onChange={(event) => {
                  const selectedArea = dormitoryAreas.find((option) => option.value === event.target.value);
                  setArea(selectedArea?.value ?? "all");
                }} className="w-full rounded-lg border border-line bg-brand-soft px-3 py-3 text-sm">
                  {dormitoryAreas.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  <option value="all">ทุกบริเวณที่มีข้อมูล</option>
                </select>
              </div>
              <div>
                <label htmlFor="electricity" className="mb-2 block text-sm font-medium">ค่าไฟต่อหน่วย</label>
                <select id="electricity" value={maxElectricity} onChange={(event) => setMaxElectricity(event.target.value)} className="w-full rounded-lg border border-line bg-brand-soft px-3 py-3 text-sm">
                  <option value="all">ทุกอัตรา</option>
                  <option value="5">ไม่เกิน 5 บาท</option>
                  <option value="7">ไม่เกิน 7 บาท</option>
                  <option value="8">ไม่เกิน 8 บาท</option>
                </select>
              </div>
              <div>
                <label htmlFor="safety" className="mb-2 block text-sm font-medium">คะแนนความปลอดภัย</label>
                <select id="safety" value={minSafety} onChange={(event) => setMinSafety(event.target.value)} className="w-full rounded-lg border border-line bg-brand-soft px-3 py-3 text-sm">
                  <option value="all">ทุกคะแนน</option>
                  <option value="4.5">ตั้งแต่ 4.5 / 5</option>
                  <option value="5">5.0 / 5</option>
                </select>
              </div>
            </div>
            <button type="button" onClick={resetFilters} className="mt-5 text-sm font-medium text-brand hover:underline">ล้างตัวกรอง</button>
          </details>
        </aside>
        <section aria-labelledby="results-heading">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 id="results-heading" aria-live="polite" className="text-base font-semibold">พบ {filteredDorms.length} หอพัก</h2>
            <p className="text-xs text-muted">ข้อมูลตามรายงาน ปีการศึกษา 2568</p>
          </div>
          {filteredDorms.length > 0 ? (
            <div>
              <p className="mb-4 rounded-lg bg-brand-soft px-4 py-3 text-base font-semibold text-brand-dark">
                {area === "all" ? "ทุกบริเวณ" : dormitoryAreas.find((option) => option.value === area)?.label}
                {" · "}{sort === "rating" ? "ความพึงพอใจสูงสุด" : "ค่าไฟต่ำสุดไปสูงสุด"}
              </p>
              <ul className="grid gap-5 sm:grid-cols-2">
                {filteredDorms.map((dormitory, index) => (
                  <li key={dormitory.id}><DormCard dormitory={dormitory} eager={index < 2} /></li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-white p-8 text-center">
              <h3 className="font-semibold">ไม่พบหอพักที่ตรงกับตัวกรอง</h3>
              <p className="mt-2 text-sm leading-6 text-muted">ลองเลือกบริเวณอื่นหรือเปลี่ยนคำค้นหา</p>
              <button type="button" onClick={resetFilters} className="primary-button mt-4">ล้างตัวกรอง</button>
            </div>
          )}
          <p className="mt-6 text-xs leading-6 text-muted">ข้อมูล {dormitories.length} หอพักจากตารางรายงานหน้า 7–9 · รูปอาจเป็นภาพในอดีตหรือห้องตัวอย่าง หอพักที่ยังไม่มีรูปที่ยืนยันได้ใช้ภาพประกอบ</p>
        </section>
      </div>
    </main>
  );
}
