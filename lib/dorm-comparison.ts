import type { Dormitory } from "@/data/dormitories";

export type ComparisonRow = {
  label: string;
  firstValue: string;
  secondValue: string;
  preferred: "first" | "second" | null;
  note?: string;
};

export function compareDormitories(first: Dormitory, second: Dormitory): ComparisonRow[] {
  if (first.id === second.id) {
    throw new Error("กรุณาเลือกหอพักคนละแห่ง");
  }

  function numericRow(label: string, firstValue: number, secondValue: number, higherIsBetter: boolean, unit: string): ComparisonRow {
    const firstIsPreferred = higherIsBetter ? firstValue > secondValue : firstValue < secondValue;
    const preferred = firstValue === secondValue ? null : firstIsPreferred ? "first" : "second";
    return {
      label,
      firstValue: `${higherIsBetter ? firstValue.toFixed(1) : firstValue} ${unit}`,
      secondValue: `${higherIsBetter ? secondValue.toFixed(1) : secondValue} ${unit}`,
      preferred,
      note: firstValue === secondValue ? "เท่ากัน" : higherIsBetter ? "คะแนนสูงกว่า" : "ค่าไฟต่ำกว่า",
    };
  }

  return [
    { label: "บริเวณ", firstValue: first.area, secondValue: second.area, preferred: null },
    { label: "ค่าเช่ารายเดือน", firstValue: "ไม่มีข้อมูลในรายงาน", secondValue: "ไม่มีข้อมูลในรายงาน", preferred: null },
    numericRow("ค่าไฟต่อหน่วย", first.electricityPrice, second.electricityPrice, false, "บาท / หน่วย"),
    { label: "ค่าน้ำตามตาราง", firstValue: first.waterPrice ?? "ไม่มีข้อมูลในรายงาน", secondValue: second.waterPrice ?? "ไม่มีข้อมูลในรายงาน", preferred: null },
    { label: "วิธีเดินทาง", firstValue: first.transportationOptions.join(" · "), secondValue: second.transportationOptions.join(" · "), preferred: null },
    numericRow("ความปลอดภัย", first.safetyRating, second.safetyRating, true, "/ 5"),
    numericRow("ความสะอาด", first.cleanlinessRating, second.cleanlinessRating, true, "/ 5"),
    numericRow("ความเป็นส่วนตัว", first.privacyRating, second.privacyRating, true, "/ 5"),
    numericRow("สิ่งอำนวยความสะดวก", first.facilitiesRating, second.facilitiesRating, true, "/ 5"),
    numericRow("ความพึงพอใจโดยรวม", first.overallRating, second.overallRating, true, "/ 5"),
    { label: "แหล่งข้อมูล", firstValue: `รายงานหน้า ${first.sourcePage}`, secondValue: `รายงานหน้า ${second.sourcePage}`, preferred: null },
  ];
}
