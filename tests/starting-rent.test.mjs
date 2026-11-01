import assert from "node:assert/strict";
import test from "node:test";
import { getMonthlyStartingRent, getStartingRents } from "../lib/starting-rent.ts";

const evidence = (value, status = "Needs verification") => ({ value, status, sourceUrl: "https://example.com/rent", checkedOn: "2026-10-05" });
const research = (...values) => ({ roomOffers: values.map((rent) => ({ rent })) });

test("uses the lowest published range or single price and preserves its evidence", () => {
  const lowest = evidence("เริ่มต้น 3,990–4,500 บาท/เดือน");
  const [price] = getStartingRents(research([evidence("5,500 บาท/เดือน", "Verified")], [lowest]));
  assert.equal(price.amount, 3990);
  assert.equal(price.maximumAmount, 5500);
  assert.equal(price.evidence, lowest);
  assert.equal(price.needsVerification, true);
});

test("combines the bounds of room offers with the same billing unit", () => {
  const [price] = getStartingRents(research([
    evidence("6,200–8,900 บาท/เดือน"),
    evidence("12,500 บาท/เดือน"),
    evidence("6,900–11,500 บาท/เดือน"),
  ]));
  assert.equal(price.amount, 6200);
  assert.equal(price.maximumAmount, 12500);
});

test("keeps semester, monthly, per-person and per-room prices separate", () => {
  const prices = getStartingRents(research([
    evidence("8,000 บาท / คน / ภาคการศึกษา"),
    evidence("6,000 บาท / ห้อง / เดือน"),
    evidence("5,000 บาท/เดือน"),
  ]));
  assert.deepEqual(prices.map(({ amount, unit }) => [amount, unit]), [
    [8000, "คน / ภาคการศึกษา"], [6000, "ห้อง / เดือน"], [5000, "เดือน"],
  ]);
});

test("does not mistake a contract length or annual total for a starting rent", () => {
  assert.deepEqual(getStartingRents(research([evidence("สัญญา 1–6 เดือน: 7,000 บาท/เดือน; รายปี: 72,000 บาท/ปี (6,000 บาท/เดือน)")])), []);
  assert.equal(getStartingRents(research([evidence("3,600–4,600 บาท / เดือน · สัญญา 1 ปี")]))[0].amount, 3600);
  assert.deepEqual(getStartingRents(undefined), []);
  assert.deepEqual(getStartingRents(research([])), []);
});

test("an unverified alternative keeps a verified minimum marked for verification", () => {
  const [price] = getStartingRents(research([evidence("4,000 บาท/เดือน", "Verified"), evidence("5,000 บาท/เดือน")]));
  assert.equal(price.amount, 4000);
  assert.equal(price.needsVerification, true);
});

test("monthly sorting price excludes semester and per-person prices", () => {
  assert.equal(getMonthlyStartingRent(research([
    evidence("2,000 บาท/คน/เดือน"),
    evidence("3,000 บาท/เทอม"),
    evidence("6,000 บาท/ห้อง/เดือน"),
    evidence("5,500 บาท/เดือน"),
  ])), 5500);
  assert.equal(getMonthlyStartingRent(research([evidence("3,000 บาท/เทอม")])), undefined);
  assert.equal(getMonthlyStartingRent(undefined), undefined);
});
