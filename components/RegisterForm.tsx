"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

function registrationErrorMessage(code: string | undefined) {
  switch (code) {
    case "email_address_not_authorized":
      return "Supabase ยังไม่อนุญาตให้ส่งอีเมลไปยังที่อยู่นี้ สำหรับการทดลองให้ใช้อีเมลสมาชิกใน Organization หรือตั้งค่า Custom SMTP";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "ส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองอีกครั้ง";
    case "signup_disabled":
    case "email_provider_disabled":
      return "โปรเจกต์ Supabase ยังไม่เปิดให้สมัครด้วยอีเมล กรุณาเปิด Allow new users to sign up และ Email provider";
    case "weak_password":
      return "รหัสผ่านไม่ผ่านเงื่อนไขความปลอดภัยของ Supabase กรุณาใช้รหัสผ่านที่ยาวและเดายากขึ้น";
    case "email_address_invalid":
      return "อีเมลนี้ใช้สมัครไม่ได้ กรุณาใช้อีเมลจริงแทนที่อยู่อีเมลสำหรับตัวอย่างหรือทดสอบ";
    default:
      return `สมัครสมาชิกไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน แล้วลองอีกครั้ง${code ? ` (รหัส: ${code})` : ""}`;
  }
}

export default function RegisterForm({ nextPath }: { nextPath: string }) {
  const { client, configured } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !configured || pending) return;
    if (password !== confirmation) {
      setError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return;
    }

    setPending(true);
    setError("");
    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", nextPath);
    let result;
    try {
      result = await client.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: redirectTo.toString() },
      });
    } catch {
      setPending(false);
      setError("ติดต่อ Supabase ไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตแล้วลองอีกครั้ง");
      return;
    }
    setPending(false);

    const { data, error: signUpError } = result;
    if (signUpError) {
      setError(registrationErrorMessage(signUpError.code));
      return;
    }
    if (data.session) {
      await client.auth.signOut();
      setError("โปรเจกต์ Supabase ยังไม่ได้เปิดการยืนยันอีเมล กรุณาเปิด Confirm email ในการตั้งค่า Authentication");
      return;
    }
    setSent(true);
  }

  if (!configured) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบสมาชิกยังไม่ได้เชื่อมต่อ Supabase ตั้งค่า .env.local ก่อนใช้งาน</p>;
  }

  if (sent) {
    return (
      <div className="grid gap-4">
        <p role="status" className="rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-800">
          ส่งอีเมลยืนยันแล้ว กรุณาเปิดอีเมลและกดลิงก์ยืนยันก่อนใช้งานบัญชี หากไม่พบอีเมลให้ตรวจโฟลเดอร์จดหมายขยะ
        </p>
        <Link href={"/login?next=" + encodeURIComponent(nextPath)} className="text-sm font-medium text-brand hover:underline">กลับไปหน้าเข้าสู่ระบบ</Link>
      </div>
    );
  }

  return (
    <form onSubmit={register} className="grid gap-4">
      <div>
        <label htmlFor="register-email" className="mb-2 block text-sm font-medium">อีเมล</label>
        <input id="register-email" type="email" autoComplete="email" required value={email}
          onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-2 block text-sm font-medium">รหัสผ่าน</label>
        <input id="register-password" type="password" autoComplete="new-password" required minLength={8} value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
        <p className="mt-1 text-xs text-muted">อย่างน้อย 8 ตัวอักษร</p>
      </div>
      <div>
        <label htmlFor="register-confirmation" className="mb-2 block text-sm font-medium">ยืนยันรหัสผ่าน</label>
        <input id="register-confirmation" type="password" autoComplete="new-password" required minLength={8} value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p>}
      <button type="submit" disabled={pending} className="primary-button w-full disabled:cursor-wait disabled:opacity-60">
        {pending ? "กำลังสร้างบัญชี…" : "สร้างบัญชี"}
      </button>
      <p className="text-xs leading-5 text-muted">ระบบจะส่งลิงก์ยืนยันไปยังอีเมลก่อนเปิดใช้งานบัญชี</p>
    </form>
  );
}
