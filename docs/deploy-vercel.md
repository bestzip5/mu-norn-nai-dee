# เผยแพร่เว็บบน Vercel

## รอบแรก: เปิดให้ดูข้อมูลก่อน

1. ตรวจ `npm run build`, `npm run lint` และ `node --test tests/*.test.mjs` ให้ผ่าน
2. ส่งโค้ดที่ตรวจแล้วขึ้น GitHub และสร้าง Vercel Project จาก repository นี้
3. ใน Supabase Authentication > General Configuration ปิด **Allow new users to sign up** ระหว่างที่ยังไม่เปิดรับสมัคร การซ่อนแบบฟอร์มบนเว็บเพียงอย่างเดียวไม่ปิด API สมัครบัญชี
4. ตั้ง Environment Variables ใน Vercel สำหรับ Production: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_ENABLE_REGISTRATION=false` ใช้เฉพาะ publishable key ในตัวแปรที่ขึ้นต้น `NEXT_PUBLIC_` ห้ามใส่ service role key
5. Deploy แล้วเปิด URL `*.vercel.app` ที่ Vercel ให้ ตรวจหน้าแรก ค้นหา ตัวกรอง เปรียบเทียบ หน้ารายละเอียด และลิงก์แหล่งข้อมูลทั้งบนคอมพิวเตอร์และโทรศัพท์
6. ใน Supabase Authentication > URL Configuration ตั้ง Site URL เป็น URL ที่เผยแพร่ และเพิ่ม Redirect URL สำหรับ `/auth/callback` ของโดเมนจริง เก็บ localhost สำหรับทดสอบในเครื่อง
7. ทดลองเข้าสู่ระบบด้วยบัญชีเดิม บันทึกและลบหอพักที่สนใจ แล้วออกจากระบบ ตรวจว่าผู้เข้าชมทั่วไปยังค้นหาและเปรียบเทียบได้

## รอบถัดไป: เปิดสมัครสมาชิก

1. ตั้ง Custom SMTP ด้วยบริการส่งอีเมลที่ใช้งานได้และอีเมลผู้ส่งที่ผ่านการยืนยัน
2. เปิด **Allow new users to sign up** ใน Supabase แล้วทดลองสมัครด้วยอีเมลใหม่ รับลิงก์ยืนยัน เข้าสู่ระบบ และขอลิงก์ตั้งรหัสผ่านใหม่บนโดเมนจริง
3. ตั้ง `NEXT_PUBLIC_ENABLE_REGISTRATION=true` ใน Vercel แล้ว Redeploy หากเคยตั้งค่าเป็น `false` ไว้ในรอบแรก

## ข้อมูลที่ต้องตรวจหลังเผยแพร่

- หน้า `/register` ต้องแจ้งว่าระบบสมัครสมาชิกจะเปิดภายหลังในรอบแรก
- ไม่มีข้อผิดพลาดใน Vercel Logs หรือ Browser Console ระหว่างใช้งานหลัก
- ข้อมูลหอพักและรูปแสดงครบ และไม่มีลิงก์สำคัญที่เสีย
- ตรวจ Supabase Security Advisor และบันทึกคำเตือนที่ยังเหลือไว้ การป้องกันรหัสผ่านที่เคยรั่วไหลเป็นฟีเจอร์ของ Supabase Pro ขึ้นไป ไม่ใช่เงื่อนไขของการเปิดดูข้อมูลในรอบแรก

ดูการตั้งค่า Supabase เพิ่มเติมใน [supabase-setup.md](supabase-setup.md)
