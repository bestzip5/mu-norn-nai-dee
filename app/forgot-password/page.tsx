import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const params = await searchParams;
  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="page-container py-10 sm:py-16">
        <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-brand">MU นอนไหนดี</p>
          <h1 className="mt-2 text-2xl font-bold">ลืมรหัสผ่าน</h1>
          <p className="mt-2 text-sm leading-6 text-muted">กรอกอีเมลเพื่อรับลิงก์ตั้งรหัสผ่านใหม่</p>
          {params.error === "link" && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">ลิงก์ตั้งรหัสผ่านใช้ไม่ได้หรือหมดอายุแล้ว กรุณาขอลิงก์ใหม่</p>}
          <div className="mt-6"><ForgotPasswordForm /></div>
          <Link href="/login" className="mt-5 inline-block text-sm font-medium text-brand hover:underline">กลับไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </section>
    </main>
  );
}
