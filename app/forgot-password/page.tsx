import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="page-container py-10 sm:py-16">
        <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-brand">MU นอนไหนดี</p>
          <h1 className="mt-2 text-2xl font-bold">ลืมรหัสผ่าน</h1>
          <p className="mt-2 text-sm leading-6 text-muted">กรอกอีเมลเพื่อรับลิงก์ตั้งรหัสผ่านใหม่</p>
          <div className="mt-6"><ForgotPasswordForm /></div>
          <Link href="/login" className="mt-5 inline-block text-sm font-medium text-brand hover:underline">กลับไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </section>
    </main>
  );
}
