export type DormitoryImage = {
  src: string;
  alt: string;
  sourceName: string;
  sourceUrl: string;
  checkedOn: string;
  status: "Verified" | "Needs verification";
  publishedOn?: string;
  pendingReview?: boolean;
  fit?: "cover" | "contain";
  note: string;
};

// Photo evidence is separate from the unchanged survey dataset.
export const dormitoryImages: Partial<Record<string, DormitoryImage>> = {
  "mu-condo": {
    "src": "/images/dormitories/mu-condo.jpg",
    "alt": "อาคารชุดพักอาศัย MU Condo มหาวิทยาลัยมหิดล",
    "sourceName": "MU Condo · มหาวิทยาลัยมหิดล",
    "sourceUrl": "https://sites.google.com/mahidol.edu/mucondo/home",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "chatchanan-apartment": {
    "src": "/images/dormitories/chatchanan-apartment.png",
    "alt": "ด้านหน้าอาคารชัชฐนันท์ อพาร์ทเม้นท์ พร้อมป้ายชื่อหอพัก",
    "sourceName": "ZmyHome · Chatthanan Apartment",
    "sourceUrl": "https://zmyhome.com/apartment/5785",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "ribbin-apartment": {
    "src": "/images/dormitories/ribbin-apartment.jpg",
    "alt": "Front exterior of Ribbin Apartment Salaya with Ribbin sign",
    "sourceName": "zmyhome.com",
    "sourceUrl": "https://zmyhome.com/apartment/5758",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "Visually checked actual exterior with RIBBIN sign; live public listing matches address141/23SalayaSoi1. Filename suggests2025upload but publication and capture dates not independently confirmed."
  },
  "latitude-longitude-condominium": {
    "src": "/images/dormitories/latitude-longitude-condominium.jpg",
    "alt": "อาคาร Latitude-Longitude ศาลายา จากผลงานของผู้ออกแบบ",
    "sourceName": "i-du Architects",
    "sourceUrl": "https://iduarchitects.wordpress.com/portfolio/latitude-longitude-apartment-salaya-nakornpathom/",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "the-dearly-residence": {
    "src": "/images/dormitories/the-dearly-residence.jpg",
    "alt": "ด้านหน้าอาคาร The Dearly Residence Salaya",
    "sourceName": "RentHub · The Dearly Residence",
    "sourceUrl": "https://www.renthub.in.th/the-dearly-residence-salaya",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "the-enter": {
    "src": "/images/dormitories/the-enter.jpg",
    "alt": "ห้องพักของ The Enter Salaya จากหน้าประกาศหอพัก",
    "sourceName": "RentHub · The Enter Salaya",
    "sourceUrl": "https://www.renthub.in.th/en/the-enter-salaya",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "kpn": {
    "src": "/images/dormitories/kpn.jpg",
    "alt": "ด้านหน้าอาคารพร้อมป้าย KPN Place ศาลายา",
    "sourceName": "RentHub · KPN Place",
    "sourceUrl": "https://www.renthub.in.th/kpn-place-near-mahidol-university-จากประตู-6-เพียง-800-เมตร",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "the-best-plus-resistance": {
    "src": "/images/dormitories/the-best-plus-resistance.jpg",
    "alt": "ห้องพักจากประกาศ The Best Plus Residence ศาลายา",
    "sourceName": "Hongpak · The Best Plus Residence",
    "sourceUrl": "https://www.hongpak.in.th/rooms/39409-the-best-plus-residence",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "dormy-inc": {
    "src": "/images/dormitories/dormy-inc.jpg",
    "alt": "ด้านหน้าอาคาร Dormy Inc. ศาลายา",
    "sourceName": "RentHub · Dormy Inc.",
    "sourceUrl": "https://www.renthub.in.th/dormy-inc",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "bed-station": {
    "src": "/images/dormitories/bed-station.jpg",
    "alt": "ห้องพักจากประกาศ PJ Bed Station บริเวณประตู 6",
    "sourceName": "RentHub · PJ Bed Station",
    "sourceUrl": "https://www.renthub.in.th/en/pj-bed-station",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "uniloft": {
    "src": "/images/dormitories/uniloft.jpg",
    "alt": "พื้นที่ต้อนรับของ Uniloft ศาลายา จากบทความแนะนำหอพัก",
    "sourceName": "MAHATPAK · Uniloft ศาลายา",
    "sourceUrl": "https://mahatpakdotnet.wordpress.com/2016/03/23/uniloft-ศาลายา-หอพัก-ม-มหิดล-ศาล/",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "sukontha-mansion": {
    "src": "/images/dormitories/sukontha-mansion.jpg",
    "alt": "อาคารสุคนธาแมนชั่นในซอยบ้านตั้งสิน",
    "sourceName": "Hongpak · สุคนธาแมนชั่น",
    "sourceUrl": "https://www.hongpak.in.th/rooms/3962-sukonthamansion",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "bundit-place": {
    "src": "/images/dormitories/bundit-place.jpg",
    "alt": "อาคารและสระว่ายน้ำของ Bundit Place จากหน้าแนะนำที่พัก",
    "sourceName": "HotelDirect · บัณฑิตเพลส",
    "sourceUrl": "https://www.hoteldirect.in.th/โรงแรม/นครปฐม/บัณฑิตเพลส.html",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "salaya-one": {
    "src": "/images/dormitories/salaya-one.jpg",
    "alt": "อาคาร Salaya One Premium Serviced Apartments",
    "sourceName": "Salaya One · เว็บไซต์ที่พัก",
    "sourceUrl": "https://salayaone.com/serviced-apartment/",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "bundit-parlor": {
    "src": "/images/dormitories/bundit-parlor.jpg",
    "alt": "ด้านหน้าอาคารพร้อมป้าย Bundit Parlor ศาลายา",
    "sourceName": "RentHub · Bundit Parlor",
    "sourceUrl": "https://www.renthub.in.th/บัณฑิตพาร์เลอร์-ศาลายา-มหิดล",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "bundit-house": {
    "src": "/images/dormitories/bundit-house.jpg",
    "alt": "ด้านนอกอาคาร Bundit House จากเว็บไซต์หอพัก",
    "sourceName": "Bundit House · เว็บไซต์หอพัก",
    "sourceUrl": "https://www.bundithouse.com/",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ยังไม่พบภาพใหม่ที่ยืนยันวันเผยแพร่และตัวอาคารได้ จึงคงภาพเดิม; ไม่รับรองว่าเป็นสภาพปัจจุบัน"
  },
  "zelle-salaya": {
    "src": "/images/dormitories/zelle-salaya.webp",
    "alt": "ห้องตัวอย่าง Zelle Salaya จากเว็บไซต์ผู้พัฒนาโครงการ",
    "sourceName": "Prinsiri · Zelle Salaya",
    "sourceUrl": "https://www.prinsiri.com/en/project/zelle-salaya",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ภาพห้องตัวอย่างจากผู้พัฒนา; รายงานไม่ระบุอาคาร จึงยังไม่เปลี่ยนเป็นภาพเฟสใหม่ วันที่ภาพ Not available"
  },
  "v-a-apartment": {
    "src": "/images/dormitories/v-a-apartment.jpg",
    "alt": "Front exterior of v-a-apartment Salaya",
    "sourceName": "www.renthub.in.th",
    "sourceUrl": "https://www.renthub.in.th/en/v-a-apartment",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ตรวจภาพภายนอกจากแกลเลอรีประกาศที่ตรงชื่อและพื้นที่ ไม่ระบุวันถ่าย/เผยแพร่ จึงยืนยันไม่ได้ว่าใหม่ที่สุด"
  },
  "4-sundorm": {
    "src": "/images/dormitories/4-sundorm.jpg",
    "alt": "Front exterior of 4-sundorm Salaya",
    "sourceName": "www.renthub.in.th",
    "sourceUrl": "https://www.renthub.in.th/en/4sundorm",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ตรวจภาพภายนอกจากแกลเลอรีประกาศที่ตรงชื่อและพื้นที่ ไม่ระบุวันถ่าย/เผยแพร่ จึงยืนยันไม่ได้ว่าใหม่ที่สุด"
  },
  "ramathibodi-nursing-dormitory": {
    "src": "/images/dormitories/ramathibodi-nursing-dormitory.jpg",
    "alt": "ภาพหน้าอาคารและภายในหอพักนักศึกษาพยาบาลรามาธิบดี ศาลายา",
    "sourceName": "www.rama.mahidol.ac.th",
    "sourceUrl": "https://www.rama.mahidol.ac.th/nursing/rans/th/student/dormitory",
    "checkedOn": "2026-10-05",
    "status": "Verified",
    "note": "ดาวน์โหลดและตรวจภาพแล้ว ป้ายอาคารตรง; ภาพหน้าอาคารอยู่ซ้ายของภาพชุด ไม่มีวันที่เผยแพร่/ถ่าย จึงไม่รับรองว่าใหม่ที่สุด"
  },
  "crystal-place": {
    "src": "/images/dormitories/crystal-place.jpg",
    "alt": "ป้าย Crystal Place ศาลายาและอาคารด้านหลัง",
    "sourceName": "crystalplacesalaya.com",
    "sourceUrl": "http://crystalplacesalaya.com/",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ภาพป้ายหอและต้นไม้ในเว็บไซต์ทางการ ดูเป็นภาพถ่ายจริง แต่แสดงอาคารเพียงบางส่วนและไม่ทราบวันถ่าย; ให้ตรวจภาพเต็มก่อนใช้"
  },
  "kave-mutant-salaya": {
    "src": "/images/dormitories/kave-mutant-salaya.jpg",
    "alt": "ทางเข้าด้านหน้า KAVE SALAYA พร้อมป้ายชื่อโครงการ",
    "sourceName": "www.scancondo.com",
    "sourceUrl": "https://www.scancondo.com/เช่าคอนโด/เคฟ-มิวแทนท์-ศาลายา",
    "checkedOn": "2026-10-05",
    "status": "Needs verification",
    "note": "ตรวจภาพถ่ายทางเข้าจริงพร้อมป้ายชื่อ ไม่ใช่ภาพจำลอง; วันที่ถ่าย/เผยแพร่ Not available ไม่รับรองว่าใหม่ที่สุด"
  },
  "i-condo-salaya": {
    "src": "/images/dormitories/i-condo-salaya-pending.jpg",
    "alt": "รูปที่รอตรวจสอบของ i-condo-salaya",
    "sourceName": "www.pf.co.th",
    "sourceUrl": "https://www.pf.co.th/th/project/condominium/icondo/salaya",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "รูปจากหน้าโครงการ iCondo Salaya ของ Property Perfect; รายงานไม่ระบุเฟสหรืออาคาร จึงรอเจ้าของโครงการตรวจว่าตรงกับรายการ"
  },
  "v-condo": {
    "src": "/images/dormitories/v-condo-pending.jpg",
    "alt": "รูปที่รอตรวจสอบของ v-condo",
    "sourceName": "propertyhub.in.th",
    "sourceUrl": "https://propertyhub.in.th/listings/%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%81%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2-%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94-v-condo-%E0%B8%A8%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%B2-%E0%B8%95%E0%B9%88%E0%B8%B3%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2-2-%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B8%99-%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2-yield-%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B5%E0%B9%8A%E0%B8%94-6-363-%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%9B%E0%B8%B5-70---5731623",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "รูปอาคารจากประกาศ V Condo Salaya; ยังไม่ได้ยืนยันว่าเป็นอาคารที่ผู้ตอบแบบสอบถามพัก"
  },
  "elite": {
    "src": "/images/dormitories/elite-pending.jpg",
    "alt": "รูปที่รอตรวจสอบของ elite",
    "sourceName": "www.livinginsider.com",
    "sourceUrl": "https://www.livinginsider.com/livingdetail_en/2762437/Elit-Salaya-Condo.html",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "รูปทางเข้าพร้อมป้าย Elite Salaya จากประกาศ; รอตรวจสอบตัวอาคารและสภาพปัจจุบัน"
  },
  "triple-five": {
    "src": "/images/dormitories/triple-five-pending.jpg",
    "alt": "รูปที่รอตรวจสอบของ triple-five",
    "sourceName": "zmyhome.com",
    "sourceUrl": "https://zmyhome.com/apartment/5793",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "รูปอาคารจากรายการ Triple Five Salaya; รอผู้ใช้ยืนยันตัวอาคาร"
  },
  "triple-a": {
    "src": "/images/dormitories/triple-a-pending.jpg",
    "alt": "รูปที่รอตรวจสอบของ triple-a",
    "sourceName": "www.traveloka.com",
    "sourceUrl": "https://www.traveloka.com/en-en/hotel/thailand/triple-a-residence-3000010043792",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "รูปด้านหน้าพร้อมป้าย Triple A Residence จากรายการที่พักพุทธมณฑล; รอผู้ใช้ยืนยันว่าตรงกับรายการในรายงาน"
  },
  "dorm-11": {
    "src": "/images/dormitories/dorm-11-pending.jpg",
    "alt": "ภาพหอพักมหิดลจากคลังภาพมหาวิทยาลัย รอยืนยันว่าตรงกับหอ 11",
    "sourceName": "archive.li.mahidol.ac.th",
    "sourceUrl": "https://archive.li.mahidol.ac.th/handle/0280026809/10275",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "ภาพจากคลังมหาวิทยาลัยปี 2566; รอผู้ใช้ตรวจหมายเลขหอ แสดงภาพเต็มพร้อมข้อความสิทธิ์และเครดิตเดิม ห้ามแก้ไขหรือใช้เชิงพาณิชย์ตามข้อความในภาพ",
    "fit": "contain"
  },
  "dorm-6-7": {
    "src": "/images/dormitories/dorm-6-7-pending.jpg",
    "alt": "ภาพภายนอกอาคารจากรีวิวหอ 6–7 บ้านมหิดล",
    "sourceName": "www.blockdit.com",
    "sourceUrl": "https://www.blockdit.com/posts/5ff1d2696454fb0cdfe25d91",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "จากรีวิวหอ 6–7 ปี 2563; รอยืนยันหมายเลขอาคารและสภาพปัจจุบัน"
  },
  "the-best-resident": {
    "src": "/images/dormitories/the-best-resident-pending.jpg",
    "alt": "ภาพอาคารจากประกาศ The Best Apartment ที่รอเทียบกับ The Best resident",
    "sourceName": "www.renthub.in.th",
    "sourceUrl": "https://www.renthub.in.th/the-best-apartment-อพาร์ทเม้นท์-ใกล้-มหิดล-ศาลายา",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "ชื่อในแหล่งคือ The Best Apartment และภาพคล้ายที่ใช้ใน The Best Plus; ยังยืนยันไม่ได้ว่าเป็น The Best resident ในรายงาน ต้องตรวจเป็นพิเศษ"
  },
  "bundit-home": {
    "src": "/images/dormitories/bundit-home-pending.jpg",
    "alt": "ภาพสระว่ายน้ำจากแกลเลอรี Bundit Home",
    "sourceName": "www.bundithome.com",
    "sourceUrl": "http://www.bundithome.com/แกลเลอรี่/",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "ภาพพื้นที่ส่วนกลางจากเว็บไซต์ Bundit Home ไม่ใช่ภาพหน้าอาคาร; อาจเป็นพื้นที่ใช้ร่วมกับหออื่นในกลุ่ม รอตรวจสอบ"
  },
  "namthong-sikkhalai": {
    "src": "/images/dormitories/namthong-sikkhalai-pending.jpg",
    "alt": "ภาพปกวิดีโอรีวิวหอพักน้ำทองสิกขาลัยพร้อมอาคารด้านหลัง",
    "sourceName": "www.youtube.com",
    "sourceUrl": "https://www.youtube.com/watch?v=x6cL-DHCHTs",
    "checkedOn": "2026-10-06",
    "status": "Needs verification",
    "pendingReview": true,
    "note": "ภาพปกวิดีโอรีวิววันที่ 19 ธันวาคม 2020 มีผู้รีวิวและอาคารอยู่ด้านหลัง ไม่ใช่ภาพหน้าอาคารเดี่ยว; รอผู้ใช้ตรวจสอบ",
    "fit": "contain"
  }
};
