# ตั้งค่า Supabase สำหรับระบบบันทึกหอพัก

1. สร้าง Supabase project แล้วเปิด SQL Editor
2. รัน SQL ใน [`supabase/migrations/20261021000000_create_favorites.sql`](../supabase/migrations/20261021000000_create_favorites.sql) เพื่อสร้างตารางรายการโปรดและ policy ของ RLS
3. คัดลอก `.env.example` เป็น `.env.local` แล้วแทนค่าด้วย Project URL และ publishable key จากหน้า Connect ของ Supabase
4. ใน Supabase Authentication เปิด Email provider, เปิด **Allow new users to sign up** และ **Confirm email** เพื่อบังคับยืนยันอีเมลก่อนใช้งานบัญชี
5. ตั้ง Site URL เป็น `http://localhost:3000` และเพิ่ม Redirect URL `http://localhost:3000/auth/callback`
6. เปิดเว็บด้วย `npm.cmd run dev` ใน PowerShell แล้วลองสมัครที่ `/register` กดลิงก์ยืนยันในอีเมล และเข้าสู่ระบบด้วยรหัสผ่านที่ `/login`

หากลืมรหัสผ่าน ให้กด **ลืมรหัสผ่าน?** ในหน้าเข้าสู่ระบบ กรอกอีเมลที่ใช้สมัคร แล้วกดลิงก์ในอีเมลเพื่อไปหน้า `/update-password` และตั้งรหัสใหม่ ใน Supabase Auth > URL Configuration > Redirect URLs ให้เพิ่ม `http://localhost:3000/auth/callback?next=%2Fupdate-password` และ URL เดียวกันบนโดเมนที่ deploy แล้ว เช่น `https://your-site.vercel.app/auth/callback?next=%2Fupdate-password` เพราะระบบส่ง URL นี้ไปกับคำขอรีเซ็ตรหัสผ่าน หากลิงก์หมดอายุ ให้ขอลิงก์ใหม่ที่ `/forgot-password`

ระบบสมัครสมาชิกปิดตามค่าเริ่มต้น ตั้ง `NEXT_PUBLIC_ENABLE_REGISTRATION=true` ใน `.env.local` เพื่อทดลองปุ่มและฟอร์มบนเครื่อง เมื่อพร้อมเปิดรับผู้สมัครทั่วไป ต้องตั้ง Custom SMTP และทดสอบอีเมลยืนยันก่อนเปิดค่าเดียวกันบน Vercel หากต้องการปิดรับสมัครจริง ให้ปิด **Allow new users to sign up** ใน Supabase Authentication > General Configuration ด้วย เพราะการซ่อนฟอร์มบนเว็บไม่ปิด API สมัครบัญชี

Supabase ที่ยังใช้บริการส่งอีเมลเริ่มต้นจะส่งอีเมลยืนยันได้เฉพาะที่อยู่อีเมลของสมาชิกใน Organization และจำกัดจำนวนอีเมลต่อชั่วโมง หากต้องการให้ผู้เข้าชมทั่วไปสมัครได้ ให้ตั้งค่า **Custom SMTP** ใน Authentication ก่อน ห้ามปิด Confirm email เพื่อแก้ปัญหาการส่งอีเมล เพราะจะทำให้สมัครด้วยอีเมลที่ไม่ได้ยืนยันได้

Supabase Auth ไม่สร้างบัญชีใหม่ซ้ำสำหรับอีเมลที่ลงทะเบียนแล้ว เมื่อเปิด Confirm email การสมัครซ้ำอาจได้ผลตอบกลับแบบไม่เปิดเผยว่ามีบัญชีอยู่ เพื่อป้องกันการตรวจสอบรายชื่อบัญชี เว็บจึงแสดงข้อความกลางหลังส่งคำขอ และแนะนำให้ใช้หน้าเข้าสู่ระบบหรือขอตั้งรหัสผ่านใหม่

ก่อน deploy ให้ตั้งค่า environment variables ชุดเดียวกันในระบบ hosting และเพิ่ม URL callback ของโดเมนจริงใน Supabase Auth Redirect URLs ด้วย การส่งอีเมลยืนยันและเปลี่ยนรหัสผ่านบนเว็บที่เผยแพร่จริงควรตั้งค่า SMTP ของตนเองใน Supabase

ข้อมูลรายการหอพักและแหล่งอ้างอิงยังคงอยู่ในโปรเจกต์ ส่วนฐานข้อมูลเก็บเฉพาะความสัมพันธ์ระหว่างบัญชีผู้ใช้กับหอพักที่บันทึกไว้
