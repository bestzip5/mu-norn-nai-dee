export const dormitoryAreas = [
  { value: "ในมหาวิทยาลัย", label: "บริเวณในมหาวิทยาลัย" },
  { value: "หน้ามหาวิทยาลัย", label: "บริเวณหน้ามหาวิทยาลัย" },
  { value: "ประตู 5 และ 6", label: "บริเวณประตู 5 และ 6" },
  { value: "ซอยบ้านตั้งสิน", label: "ซอยบ้านตั้งสิน" },
  { value: "อื่น ๆ", label: "บริเวณอื่น ๆ" },
] as const;

export type DormitoryArea = (typeof dormitoryAreas)[number]["value"];

export type Dormitory = {
  id: string;
  name: string;
  area: DormitoryArea;
  overallRating: number; // Out of 5.
  safetyRating: number; // Out of 5.
  cleanlinessRating: number;
  privacyRating: number;
  facilitiesRating: number; // A survey rating, not a list of amenities.
  waterPrice: string | null; // Exact table value; null means blank or '-'.
  electricityPrice: number; // Thai baht per kWh (unit).
  transportationOptions: string[];
  sourcePage: number;
  sourceNote?: string;
};

// Source: docs/research/68-330 รายงานโครงงาน.pdf, tables on pages 7-9.
// Names, prices and ratings follow the table, including its spelling.
// Water values without a billing period remain unchanged; '-' is not zero.
export const dormitories: Dormitory[] = [
  {
    id: "dorm-11",
    name: "หอ 11",
    area: "ในมหาวิทยาลัย",
    overallRating: 3.8,
    safetyRating: 4.8,
    cleanlinessRating: 4.2,
    privacyRating: 3.3,
    facilitiesRating: 4.1,
    waterPrice: "200/เทอม",
    electricityPrice: 7,
    transportationOptions: ["เดิน"],
    sourcePage: 7,
  },
  {
    id: "dorm-6-7",
    name: "หอ 6-7",
    area: "ในมหาวิทยาลัย",
    overallRating: 4,
    safetyRating: 5,
    cleanlinessRating: 4.3,
    privacyRating: 3.1,
    facilitiesRating: 3.7,
    waterPrice: null,
    electricityPrice: 7,
    transportationOptions: ["เดิน"],
    sourcePage: 7,
  },
  {
    id: "mu-condo",
    name: "MU Condo",
    area: "ในมหาวิทยาลัย",
    overallRating: 4.4,
    safetyRating: 5,
    cleanlinessRating: 4.8,
    privacyRating: 4.4,
    facilitiesRating: 4.2,
    waterPrice: "27",
    electricityPrice: 7,
    transportationOptions: ["เดิน"],
    sourcePage: 7,
  },
  {
    id: "ramathibodi-nursing-dormitory",
    name: "หอพักพยาบาลรามาธิบดี",
    area: "ในมหาวิทยาลัย",
    overallRating: 4,
    safetyRating: 5,
    cleanlinessRating: 5,
    privacyRating: 3,
    facilitiesRating: 4,
    waterPrice: null,
    electricityPrice: 5,
    transportationOptions: ["เดิน"],
    sourcePage: 7,
  },
  {
    id: "uniloft",
    name: "Uniloft",
    area: "ซอยบ้านตั้งสิน",
    overallRating: 4.3,
    safetyRating: 4.4,
    cleanlinessRating: 3.8,
    privacyRating: 4.3,
    facilitiesRating: 3.4,
    waterPrice: "28",
    electricityPrice: 3.4,
    transportationOptions: [
      "บริการรถตู้ของหอพัก",
      "รถจักรยานยนต์รับจ้าง",
      "แอปพลิเคชัน",
    ],
    sourcePage: 7,
  },
  {
    id: "bundit-home", name: "Bundit Home", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 4.88,
    safetyRating: 4.5, cleanlinessRating: 4.3, privacyRating: 4.1, facilitiesRating: 4.2, overallRating: 4.1,
    transportationOptions: ["บริการรถตู้ของหอพัก"], sourcePage: 7,
  },
  {
    id: "i-condo-salaya", name: "I condo Salaya", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 7,
    safetyRating: 5, cleanlinessRating: 4.6, privacyRating: 4.6, facilitiesRating: 4.3, overallRating: 4.6,
    transportationOptions: ["รถจักรยานยนต์รับจ้าง", "แอปพลิเคชัน"], sourcePage: 7,
  },
  {
    id: "sukontha-mansion", name: "สุคนธาแมนชั่น", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 4.5,
    safetyRating: 4.3, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 4.3, overallRating: 4,
    transportationOptions: ["บริการรถตู้ของหอพัก", "แอปพลิเคชัน"], sourcePage: 7,
  },
  {
    id: "bundit-place", name: "Bundit Place", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 7,
    safetyRating: 5, cleanlinessRating: 5, privacyRating: 5, facilitiesRating: 5, overallRating: 5,
    transportationOptions: ["บริการรถตู้ของหอพัก"], sourcePage: 7,
  },
  {
    id: "crystal-place", name: "Crystal place", area: "ซอยบ้านตั้งสิน",
    waterPrice: "100/เดือน", electricityPrice: 8,
    safetyRating: 4.5, cleanlinessRating: 4.5, privacyRating: 4.5, facilitiesRating: 4, overallRating: 4.5,
    transportationOptions: ["บริการรถตู้ของหอพัก", "รถแท็กซี่", "แอปพลิเคชัน"], sourcePage: 7,
    sourceNote: "รายการแอปพลิเคชันในช่องวิธีการเดินทางต่อเนื่องอยู่ต้นหน้า 8",
  },
  {
    id: "salaya-one", name: "Salaya One", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 7,
    safetyRating: 4.5, cleanlinessRating: 5, privacyRating: 3.5, facilitiesRating: 5, overallRating: 4,
    transportationOptions: ["บริการรถตู้ของหอพัก", "รถแท็กซี่", "แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "v-condo", name: "V condo", area: "ซอยบ้านตั้งสิน",
    waterPrice: "35", electricityPrice: 4,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "bundit-parlor", name: "Bundit Parlor", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 4.88,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 5, overallRating: 4,
    transportationOptions: ["บริการรถตู้ของหอพัก"], sourcePage: 8,
  },
  {
    id: "bundit-house", name: "Bundit House", area: "ซอยบ้านตั้งสิน",
    waterPrice: "30", electricityPrice: 4.88,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 3, facilitiesRating: 3, overallRating: 4,
    transportationOptions: ["บริการรถตู้ของหอพัก"], sourcePage: 8,
  },
  {
    id: "elite", name: "Elite", area: "ซอยบ้านตั้งสิน",
    waterPrice: "35", electricityPrice: 7,
    safetyRating: 4, cleanlinessRating: 5, privacyRating: 5, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "triple-five", name: "Triple five", area: "ประตู 5 และ 6",
    waterPrice: "25", electricityPrice: 8,
    safetyRating: 3, cleanlinessRating: 3, privacyRating: 2.5, facilitiesRating: 3.5, overallRating: 3,
    transportationOptions: ["รถจักรยานยนต์รับจ้าง", "แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "the-best-resident", name: "The best resident", area: "ประตู 5 และ 6",
    waterPrice: "30", electricityPrice: 8,
    safetyRating: 5, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "the-enter", name: "The enter", area: "ประตู 5 และ 6",
    waterPrice: "23", electricityPrice: 8,
    safetyRating: 5, cleanlinessRating: 4.5, privacyRating: 5, facilitiesRating: 4.5, overallRating: 4.5,
    transportationOptions: ["บริการรถตู้ของหอพัก", "รถจักรยานยนต์รับจ้าง", "แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "kpn", name: "Kpn", area: "ประตู 5 และ 6",
    waterPrice: "28.5", electricityPrice: 5.9,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["แอปพลิเคชัน"], sourcePage: 8,
    sourceNote: "ช่องที่ตั้งในตารางหน้า 8 เว้นว่าง จัดบริเวณประตู 5 และ 6 ตามข้อความสรุปหน้า 6 ซึ่งใช้ชื่อ KPN",
  },
  {
    id: "the-best-plus-resistance", name: "The best plus resistance", area: "ประตู 5 และ 6",
    waterPrice: "25", electricityPrice: 8,
    safetyRating: 5, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 3, overallRating: 4,
    transportationOptions: ["บริการรถตู้ของหอพัก", "รถจักรยานยนต์รับจ้าง"], sourcePage: 8,
  },
  {
    id: "dormy-inc", name: "Dormy inc.", area: "ประตู 5 และ 6",
    waterPrice: "100/เดือน", electricityPrice: 8,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["อื่น ๆ"], sourcePage: 8,
  },
  {
    id: "bed-station", name: "Bed station", area: "ประตู 5 และ 6",
    waterPrice: null, electricityPrice: 8,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["อื่น ๆ"], sourcePage: 8,
  },
  {
    id: "ribbin-apartment", name: "Ribbin Apartment", area: "หน้ามหาวิทยาลัย",
    waterPrice: "30", electricityPrice: 6.2,
    safetyRating: 4.5, cleanlinessRating: 4.5, privacyRating: 4.5, facilitiesRating: 4, overallRating: 4.5,
    transportationOptions: ["แอปพลิเคชัน"], sourcePage: 8,
  },
  {
    id: "chatchanan-apartment", name: "ชัชฐนันท์ อพาร์ทเม้นท์", area: "หน้ามหาวิทยาลัย",
    waterPrice: "28", electricityPrice: 7,
    safetyRating: 5, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 4, overallRating: 5,
    transportationOptions: ["บริการรถตู้ของหอพัก"], sourcePage: 9,
  },
  {
    id: "latitude-longitude-condominium", name: "Latitude longitude condominium", area: "หน้ามหาวิทยาลัย",
    waterPrice: "25", electricityPrice: 7,
    safetyRating: 3, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 3, overallRating: 4,
    transportationOptions: ["อื่น ๆ"], sourcePage: 9,
  },
  {
    id: "the-room", name: "The room", area: "หน้ามหาวิทยาลัย",
    waterPrice: null, electricityPrice: 7,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 3, overallRating: 5,
    transportationOptions: ["อื่น ๆ"], sourcePage: 9,
  },
  {
    id: "triple-a", name: "Triple A", area: "หน้ามหาวิทยาลัย",
    waterPrice: "15", electricityPrice: 7,
    safetyRating: 5, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["บริการรถตู้ของหอพัก"], sourcePage: 9,
  },
  {
    id: "the-dearly-residence", name: "The dearly residence", area: "หน้ามหาวิทยาลัย",
    waterPrice: "28", electricityPrice: 8,
    safetyRating: 3, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 3, overallRating: 4,
    transportationOptions: ["อื่น ๆ"], sourcePage: 9,
  },
  {
    id: "kave-mutant-salaya", name: "Kave Mutant Salaya", area: "อื่น ๆ",
    waterPrice: "29", electricityPrice: 3,
    safetyRating: 5, cleanlinessRating: 4.5, privacyRating: 5, facilitiesRating: 5, overallRating: 5,
    transportationOptions: ["บริการรถตู้ของหอพัก", "แอปพลิเคชัน"], sourcePage: 9,
  },
  {
    id: "zelle-salaya", name: "Zelle Salaya", area: "อื่น ๆ",
    waterPrice: "30", electricityPrice: 3.2,
    safetyRating: 4, cleanlinessRating: 5, privacyRating: 5, facilitiesRating: 5, overallRating: 5,
    transportationOptions: ["แอปพลิเคชัน"], sourcePage: 9,
  },
  {
    id: "v-a-apartment", name: "V A Apartment", area: "อื่น ๆ",
    waterPrice: "100/เดือน", electricityPrice: 7,
    safetyRating: 3, cleanlinessRating: 3, privacyRating: 4, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["รถจักรยานยนต์รับจ้าง"], sourcePage: 9,
  },
  {
    id: "4-sundorm", name: "4 sundorm", area: "อื่น ๆ",
    waterPrice: "20", electricityPrice: 8,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 4, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["รถจักรยานยนต์รับจ้าง", "แอปพลิเคชัน"], sourcePage: 9,
  },
  {
    id: "sala-residence", name: "ศาลาเรสซิเดนซ์", area: "อื่น ๆ",
    waterPrice: "30", electricityPrice: 7,
    safetyRating: 4, cleanlinessRating: 4, privacyRating: 5, facilitiesRating: 3, overallRating: 3,
    transportationOptions: ["รถจักรยานยนต์รับจ้าง"], sourcePage: 9,
  },
  {
    id: "namthong-sikkhalai", name: "น้ำทองสิกขาลัย", area: "ในมหาวิทยาลัย",
    waterPrice: "50/เดือน", electricityPrice: 6,
    safetyRating: 3, cleanlinessRating: 4, privacyRating: 2, facilitiesRating: 4, overallRating: 4,
    transportationOptions: ["เดิน"], sourcePage: 9,
  },
];
