import type { DormitoryResearch, Evidence } from "../data/dormitory-research";

export type StartingRent = {
  amount: number;
  maximumAmount: number;
  unit: string;
  evidence: Evidence;
  needsVerification: boolean;
};

// Only read simple published prices. Do not treat contract lengths or annual
// totals in a longer sentence as a monthly price, or convert billing periods.
export function getStartingRents(research?: DormitoryResearch): StartingRent[] {
  const groups = new Map<string, StartingRent>();
  for (const offer of research?.roomOffers ?? []) {
    for (const evidence of offer.rent) {
      const single = evidence.value.match(/^(?:เริ่มต้น\s*)?(\d[\d,]*(?:\.\d+)?)(?:\s*[–—-]\s*(\d[\d,]*(?:\.\d+)?))?\s*บาท\s*\/\s*(?:(คน|ห้อง)\s*\/\s*)?(ภาคการศึกษา|เทอม|เดือน)(?=\s|$|[·;(])/);
      if (!single) continue;
      const amount = Number(single[1].replaceAll(",", ""));
      const upperAmount = Number((single[2] ?? single[1]).replaceAll(",", ""));
      if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(upperAmount) || upperAmount < amount) continue;
      const period = single[4] === "เทอม" ? "ภาคการศึกษา" : single[4];
      const unit = single[3] ? `${single[3]} / ${period}` : period;
      const previous = groups.get(unit);
      const maximumAmount = Math.max(upperAmount, previous?.maximumAmount ?? upperAmount);
      const needsVerification = evidence.status !== "Verified" || Boolean(previous?.needsVerification);
      if (!previous || amount < previous.amount) {
        groups.set(unit, { amount, maximumAmount, unit, evidence, needsVerification });
      } else {
        previous.maximumAmount = maximumAmount;
        previous.needsVerification = needsVerification;
      }
    }
  }
  return [...groups.values()];
}
