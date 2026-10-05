import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { dormitories } from "../data/dormitories.ts";
import { dormitoryImages } from "../data/dormitory-images.ts";

const readJSON = (file) => JSON.parse(readFileSync(new URL(file, import.meta.url), "utf8"));
const research = Object.assign({}, ...["campus", "front-gates", "soi", "other"].map((name) => readJSON(`../data/research/${name}.json`)));
const evidenceGroups = (record) => [...record.roomOffers.flatMap((offer) => Object.values(offer)), ...Object.values(record.contacts)];

test("all original survey fields, including electricity and water, remain unchanged", () => {
  const hash = createHash("sha256").update(readFileSync(new URL("../data/dormitories.ts", import.meta.url))).digest("hex").toUpperCase();
  assert.equal(hash, "5B09ADD8DFB7DA17F491A069CF99CE0B4C6862CE2BCA34AD1489716ACC702876");
});

test("all 34 dormitories have separate research records with field-level provenance", () => {
  assert.equal(dormitories.length, 34);
  assert.deepEqual(Object.keys(research).sort(), dormitories.map((dorm) => dorm.id).sort());
  for (const record of Object.values(research)) {
    assert.ok(record.identityNote);
    for (const source of record.sources) {
      assert.match(source.url, /^https?:\/\//);
      assert.equal(source.checkedOn, "2026-10-05");
    }
    for (const values of evidenceGroups(record)) {
      assert.ok(Array.isArray(values));
      for (const value of values) {
        assert.ok(value.value);
        assert.ok(["Verified", "Needs verification"].includes(value.status));
        assert.equal(value.checkedOn, "2026-10-05");
        assert.ok(record.sources.some((source) => source.url === value.sourceUrl), value.sourceUrl);
        if (value.href) assert.match(value.href, /^(https?:\/\/|tel:)/);
      }
    }
    assert.ok(!("electricityPrice" in record));
    assert.ok(!("waterPrice" in record));
    for (const offer of record.roomOffers) assert.deepEqual(Object.keys(offer).sort(), ["deposit", "moveInCost", "rent", "roomType"]);
  }
});

test("conflicting published deposits and rents are preserved as unverified", () => {
  const deposits = research["dorm-6-7"].roomOffers.flatMap((offer) => offer.deposit);
  assert.ok(deposits.some((item) => item.value.includes("1,100")));
  assert.ok(deposits.some((item) => item.value.includes("1,900")));
  assert.ok(deposits.every((item) => item.status === "Needs verification"));
  const rents = research["ribbin-apartment"].roomOffers.flatMap((offer) => offer.rent);
  assert.ok(rents.some((item) => item.value.includes("5,500")));
  assert.ok(rents.some((item) => item.value.includes("6,900")));
  assert.ok(rents.every((item) => item.status === "Needs verification"));
});

test("missing identity information stays empty and every displayed photo exists with an audit", () => {
  assert.deepEqual(research["sala-residence"].roomOffers, []);
  assert.ok(Object.values(research["sala-residence"].contacts).every((values) => values.length === 0));
  const reviews = readJSON("../data/dormitory-photo-review.json");
  assert.equal(Object.keys(reviews).length, 34);
  const audit = readJSON("../data/dormitory-image-sources.json");
  for (const [id, photo] of Object.entries(dormitoryImages)) {
    assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)));
    assert.ok(audit.some((item) => item.dormitoryId === id && item.sourcePage === photo.sourceUrl));
    assert.match(photo.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(["Verified", "Needs verification"].includes(photo.status));
  }
});
