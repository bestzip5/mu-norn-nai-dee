export type Dormitory = {
  id: string;
  name: string;
  area: string;
  overallRating: number; // Out of 5.
  safetyRating: number; // Out of 5.
  electricityPrice: number; // Thai baht per kWh (unit).
  transportationOptions: string[];
};

// Source: docs/research/68-330 รายงานโครงงาน.pdf, pages 5 and 7.
// These are the first five dormitories listed in the report's survey table.
export const dormitories: Dormitory[] = [
  {
    id: "dorm-11",
    name: "หอ 11",
    area: "ในมหาวิทยาลัย",
    overallRating: 3.8,
    safetyRating: 4.8,
    electricityPrice: 7,
    transportationOptions: ["เดิน"],
  },
  {
    id: "dorm-6-7",
    name: "หอ 6-7",
    area: "ในมหาวิทยาลัย",
    overallRating: 4,
    safetyRating: 5,
    electricityPrice: 7,
    transportationOptions: ["เดิน"],
  },
  {
    id: "mu-condo",
    name: "MU Condo",
    area: "ในมหาวิทยาลัย",
    overallRating: 4.4,
    safetyRating: 5,
    electricityPrice: 7,
    transportationOptions: ["เดิน"],
  },
  {
    id: "ramathibodi-nursing-dormitory",
    name: "หอพักพยาบาลรามาธิบดี",
    area: "ในมหาวิทยาลัย",
    overallRating: 4,
    safetyRating: 5,
    electricityPrice: 5,
    transportationOptions: ["เดิน"],
  },
  {
    id: "uniloft",
    name: "Uniloft",
    area: "ซอยบ้านตั้งสิน",
    overallRating: 4.3,
    safetyRating: 4.4,
    electricityPrice: 3.4,
    transportationOptions: [
      "บริการรถตู้ของหอพัก",
      "รถจักรยานยนต์รับจ้าง",
      "แอปพลิเคชัน",
    ],
  },
];
