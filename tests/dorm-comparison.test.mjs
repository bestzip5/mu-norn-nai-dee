import assert from "node:assert/strict";
import test from "node:test";
import { dormitories } from "../data/dormitories.ts";
import { compareDormitories } from "../lib/dorm-comparison.ts";

function dorm(id) {
  const result = dormitories.find((item) => item.id === id);
  assert.ok(result, `Missing test dorm: ${id}`);
  return result;
}

test("compares electricity in the lower direction and all five ratings in the higher direction", () => {
  const rows = compareDormitories(dorm("mu-condo"), dorm("uniloft"));
  assert.equal(rows.length, 11);
  const electricity = rows.find((row) => row.label === "ค่าไฟต่อหน่วย");
  assert.equal(electricity.firstValue, "7 บาท / หน่วย");
  assert.equal(electricity.secondValue, "3.4 บาท / หน่วย");
  assert.equal(electricity.preferred, "second");
  for (const label of ["ความปลอดภัย", "ความสะอาด", "ความเป็นส่วนตัว", "สิ่งอำนวยความสะดวก", "ความพึงพอใจโดยรวม"]) {
    assert.equal(rows.find((row) => row.label === label).preferred, "first", label);
  }
});

test("ties have no preferred dorm; missing water and rent never become zero", () => {
  const rows = compareDormitories(dorm("dorm-6-7"), dorm("ramathibodi-nursing-dormitory"));
  for (const label of ["ความปลอดภัย", "ความพึงพอใจโดยรวม"]) {
    const row = rows.find((row) => row.label === label);
    assert.equal(row.preferred, null);
    assert.equal(row.note, "เท่ากัน");
  }
  for (const label of ["ค่าน้ำตามตาราง", "ค่าเช่ารายเดือน"]) {
    const row = rows.find((row) => row.label === label);
    assert.equal(row.firstValue, "ไม่มีข้อมูลในรายงาน");
    assert.equal(row.secondValue, "ไม่มีข้อมูลในรายงาน");
    assert.equal(row.preferred, null);
  }
});

test("keeps different water billing periods without claiming one is cheaper", () => {
  const rows = compareDormitories(dorm("dorm-11"), dorm("crystal-place"));
  const water = rows.find((row) => row.label === "ค่าน้ำตามตาราง");
  assert.equal(water.firstValue, "200/เทอม");
  assert.equal(water.secondValue, "100/เดือน");
  assert.equal(water.preferred, null);
});

test("swapping the pair reverses values and preference without changing source records", () => {
  const first = dorm("mu-condo");
  const second = dorm("uniloft");
  const before = JSON.stringify([first, second]);
  const forward = compareDormitories(first, second);
  const reverse = compareDormitories(second, first);
  forward.forEach((row, index) => {
    assert.equal(reverse[index].firstValue, row.secondValue);
    assert.equal(reverse[index].secondValue, row.firstValue);
    assert.equal(reverse[index].preferred, row.preferred === "first" ? "second" : row.preferred === "second" ? "first" : null);
  });
  assert.equal(JSON.stringify([first, second]), before);
});

test("rejects comparing the same dorm with itself", () => {
  assert.throws(() => compareDormitories(dorm("mu-condo"), dorm("mu-condo")), /กรุณาเลือกหอพักคนละแห่ง/);
});
