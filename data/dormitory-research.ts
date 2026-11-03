import campus from "./research/campus.json";
import frontGates from "./research/front-gates.json";
import soi from "./research/soi.json";
import other from "./research/other.json";

export type Evidence = {
  value: string;
  sourceUrl: string;
  checkedOn: string;
  status: "Verified" | "Needs verification";
  note?: string;
  href?: string;
};

export type DormitoryResearch = {
  identityNote: string;
  sources: { url: string; title: string; kind: string; checkedOn: string; publishedOn?: string }[];
  roomOffers: { roomType: Evidence[]; rent: Evidence[]; deposit: Evidence[]; moveInCost: Evidence[] }[];
  utilityNotes?: Evidence[];
  contacts: { phone: Evidence[]; facebook: Evidence[]; line: Evidence[]; website: Evidence[]; googleMaps: Evidence[] };
};

// Keep source audits in JSON. The research tests validate this import boundary.
export const dormitoryResearch = { ...campus, ...frontGates, ...soi, ...other } as Record<string, DormitoryResearch>;
