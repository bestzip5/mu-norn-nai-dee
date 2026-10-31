"use client";

import { useState, type FormEvent } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

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
    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", "/update-password");
    const { error: resetError } = await client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectTo.toString(),
    });
    setPending(false);
    if (resetError) {
      setError("ส่งอีเมลไม่สำเร็จ กรุณาลองอีกครั้ง");
      return;
    }
    setSent(true);
  }

  if (!configured) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบสมาชิกยังไม่ได้เชื่อมต่อ Supabase ตั้งค่า .env.local ก่อนใช้งาน</p>;
  }
  if (sent) {
    return <p role="status" className="rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-800">หากอีเมลนี้มีบัญชีอยู่ ระบบจะส่งลิงก์เปลี่ยนรหัสผ่านให้ กรุณาตรวจอีเมลและโฟลเดอร์จดหมายขยะ</p>;
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
