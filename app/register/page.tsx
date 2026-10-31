import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { safeNextPath } from "@/lib/safe-next-path";
import { isRegistrationEnabled } from "@/lib/supabase/config";

export default async function RegisterPage({ searchParams }: PageProps<"/register">) {
  const params = await searchParams;
  const nextPath = safeNextPath(typeof params.next === "string" ? params.next : null);

  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="page-container py-10 sm:py-16">
        <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-brand">MU นอนไหนดี</p>
          <h1 className="mt-2 text-2xl font-bold">สร้างบัญชี</h1>
          <p className="mt-2 text-sm leading-6 text-muted">สมัครด้วยอีเมลและรหัสผ่าน เพื่อบันทึกหอพักที่สนใจ</p>
          {isRegistrationEnabled ? (
            <div className="mt-6"><RegisterForm nextPath={nextPath} /></div>
          ) : (
            <p role="status" className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบสมัครสมาชิกใหม่จะเปิดภายหลัง คุณยังค้นหาและเปรียบเทียบหอพักได้โดยไม่ต้องมีบัญชี</p>
          )}
          <Link href={"/login?next=" + encodeURIComponent(nextPath)} className="mt-5 inline-block text-sm font-medium text-brand hover:underline">มีบัญชีแล้ว? เข้าสู่ระบบ</Link>
        </div>
      </section>
    </main>
  );
}
