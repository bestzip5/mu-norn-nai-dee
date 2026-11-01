import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { dormitories } from "../data/dormitories.ts";
import { dormitoryImages } from "../data/dormitory-images.ts";

const readJSON = (file) => JSON.parse(readFileSync(new URL(file, import.meta.url), "utf8"));
const research = Object.assign({}, ...["campus", "front-gates", "soi", "other"].map((name) => readJSON(`../data/research/${name}.json`)));
const evidenceGroups = (record) => [...record.roomOffers.flatMap((offer) => Object.values(offer)), ...Object.values(record.contacts)];

test("retained survey fields, including electricity and water, remain unchanged", () => {
  const hash = createHash("sha256").update(readFileSync(new URL("../data/dormitories.ts", import.meta.url))).digest("hex").toUpperCase();
  assert.equal(hash, "DF8EBD83294F90821606B286B15FE94081DFA2B5DED7B268FB3648E023612E7E");
});

test("all 33 published dormitories have separate research records with field-level provenance", () => {
  assert.equal(dormitories.length, 33);
  assert.deepEqual(Object.keys(research).sort(), dormitories.map((dorm) => dorm.id).sort());
  for (const record of Object.values(research)) {
    assert.ok(record.identityNote);
    for (const source of record.sources) {
      if (source.kind === "User-provided information") {
        assert.match(source.url, /^\/data-notes\/[\w-]+\.txt$/);
        assert.ok(existsSync(new URL(`../public${source.url}`, import.meta.url)));
      } else {
        assert.match(source.url, /^https?:\/\//);
      }
      assert.match(source.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
    }
    for (const values of evidenceGroups(record)) {
      assert.ok(Array.isArray(values));
      for (const value of values) {
        assert.ok(value.value);
        assert.ok(["Verified", "Needs verification"].includes(value.status));
        assert.match(value.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
        assert.ok(record.sources.some((source) => source.url === value.sourceUrl && source.checkedOn === value.checkedOn), value.sourceUrl);
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

test("unverified Sala Residence is excluded and every displayed photo exists with an audit", () => {
  assert.ok(!dormitories.some((dorm) => dorm.id === "sala-residence"));
  assert.ok(!("sala-residence" in research));
  const reviews = readJSON("../data/dormitory-photo-review.json");
  assert.equal(Object.keys(reviews).length, 33);
  assert.ok(!("sala-residence" in reviews));
  const audit = readJSON("../data/dormitory-image-sources.json");
  for (const [id, photo] of Object.entries(dormitoryImages)) {
    assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)));
    assert.ok(audit.some((item) => item.dormitoryId === id && item.sourcePage === photo.sourceUrl));
    assert.match(photo.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(["Verified", "Needs verification"].includes(photo.status));
  }
});
