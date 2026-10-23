import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { safeNextPath } from "@/lib/safe-next-path";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const nextPath = safeNextPath(typeof params.next === "string" ? params.next : null);
  const callbackMessage = params.error === "callback"
    ? "ลิงก์เข้าสู่ระบบใช้ไม่ได้หรือหมดอายุแล้ว กรุณาขอลิงก์ใหม่"
    : params.error === "configuration"
      ? "ระบบเข้าสู่ระบบยังตั้งค่าไม่ครบ กรุณาตรวจสอบการเชื่อมต่อ Supabase"
      : "";

  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="page-container py-10 sm:py-16">
        <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-brand">MU นอนไหนดี</p>
          <h1 className="mt-2 text-2xl font-bold">เข้าสู่ระบบเพื่อบันทึกหอพัก</h1>
          <p className="mt-2 text-sm leading-6 text-muted">ค้นหาและเปรียบเทียบหอพักได้โดยไม่ต้องเข้าสู่ระบบ</p>
          {callbackMessage && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{callbackMessage}</p>}
          <div className="mt-6"><LoginForm nextPath={nextPath} /></div>
          <Link href="/dorms?area=all" className="mt-5 inline-block text-sm font-medium text-brand hover:underline">กลับไปค้นหาหอพัก</Link>
        </div>
      </section>
    </main>
  );
}
