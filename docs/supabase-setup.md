# ตั้งค่า Supabase สำหรับระบบบันทึกหอพัก

1. สร้าง Supabase project แล้วเปิด SQL Editor
2. รัน SQL ใน [`supabase/migrations/20261021000000_create_favorites.sql`](../supabase/migrations/20261021000000_create_favorites.sql) เพื่อสร้างตารางรายการโปรดและ policy ของ RLS
3. คัดลอก `.env.example` เป็น `.env.local` แล้วแทนค่าด้วย Project URL และ publishable key จากหน้า Connect ของ Supabase
4. ใน Supabase Auth ตั้ง Site URL เป็น `http://localhost:3000` และเพิ่ม Redirect URL `http://localhost:3000/auth/callback`
5. เปิดเว็บด้วย `npm run dev` แล้วลองล็อกอินด้วยลิงก์ที่ส่งไปยังอีเมล

ก่อน deploy ให้ตั้งค่า environment variables ชุดเดียวกันในระบบ hosting และเพิ่ม URL callback ของโดเมนจริงใน Supabase Auth Redirect URLs ด้วย

ข้อมูลรายการหอพักและแหล่งอ้างอิงยังคงอยู่ในโปรเจกต์ ส่วนฐานข้อมูลเก็บเฉพาะความสัมพันธ์ระหว่างบัญชีผู้ใช้กับหอพักที่บันทึกไว้
