"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";
import { authRedirectOrigin } from "@/lib/supabase/config";

function resetErrorMessage(code: string | undefined) {
  switch (code) {
    case "email_address_not_authorized":
      return "Supabase ยังไม่สามารถส่งอีเมลไปยังที่อยู่นี้ได้ หากต้องการให้ผู้ใช้ทั่วไปขอเปลี่ยนรหัสผ่าน ต้องตั้งค่าบริการส่งอีเมลก่อน";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "ส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองอีกครั้ง";
    default:
      return "ส่งลิงก์เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองอีกครั้ง";
  }
}

export default function ForgotPasswordForm() {
  const { client, configured } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function requestReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !configured || pending) return;
    setPending(true);
    setError("");
    const redirectTo = new URL("/auth/callback", authRedirectOrigin);
    redirectTo.searchParams.set("next", "/update-password");
    try {
      const { error: resetError } = await client.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectTo.toString(),
      });
      if (resetError) {
        setError(resetErrorMessage(resetError.code));
        return;
      }
      setSent(true);
    } catch {
      setError("ติดต่อ Supabase ไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง");
    } finally {
      setPending(false);
    }
  }

  if (!configured) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบสมาชิกยังไม่ได้เชื่อมต่อ Supabase ตั้งค่า .env.local ก่อนใช้งาน</p>;
  }
  if (sent) {
    return (
      <div className="grid gap-4">
        <p role="status" className="rounded-lg bg-brand-soft p-4 text-sm leading-6 text-brand-dark">หากอีเมลนี้มีบัญชีอยู่ ระบบจะส่งลิงก์ตั้งรหัสผ่านใหม่ให้ กรุณาตรวจกล่องจดหมายและโฟลเดอร์จดหมายขยะ จากนั้นกดลิงก์ในอีเมลเพื่อสร้างรหัสผ่านใหม่</p>
        <Link href="/login" className="text-sm font-medium text-brand hover:underline">กลับไปหน้าเข้าสู่ระบบ</Link>
      </div>
    );
  }

  return (
    <form onSubmit={requestReset} className="grid gap-4">
      <div>
        <label htmlFor="reset-email" className="mb-2 block text-sm font-medium">อีเมลที่ใช้สมัคร</label>
        <input id="reset-email" type="email" autoComplete="email" required value={email}
          onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p>}
      <button type="submit" disabled={pending} className="primary-button w-full disabled:cursor-wait disabled:opacity-60">
        {pending ? "กำลังส่งอีเมล…" : "ส่งลิงก์เปลี่ยนรหัสผ่าน"}
      </button>
    </form>
  );
}
