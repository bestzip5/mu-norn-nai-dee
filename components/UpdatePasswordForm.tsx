"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

export default function UpdatePasswordForm() {
  const { client, user, loading, configured } = useSupabaseAuth();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState("");

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !user || pending) return;
    if (password !== confirmation) {
      setError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return;
    }
    setPending(true);
    setError("");
    const { error: updateError } = await client.auth.updateUser({ password });
    setPending(false);
    if (updateError) {
      setError("เปลี่ยนรหัสผ่านไม่สำเร็จ กรุณาลองอีกครั้ง");
      return;
    }
    setUpdated(true);
  }

  if (!configured) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบสมาชิกยังไม่ได้เชื่อมต่อ Supabase ตั้งค่า .env.local ก่อนใช้งาน</p>;
  }
  if (loading) return <p role="status" className="text-sm text-muted">กำลังตรวจสอบบัญชี…</p>;
  if (!user) {
    return <p className="text-sm leading-6 text-muted">ลิงก์เปลี่ยนรหัสผ่านใช้ไม่ได้หรือหมดอายุแล้ว <Link href="/forgot-password" className="font-medium text-brand hover:underline">ขอลิงก์ใหม่</Link></p>;
  }
  if (updated) {
    return <p role="status" className="rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-800">เปลี่ยนรหัสผ่านแล้ว <Link href="/saved" className="font-medium underline">ไปยังรายการที่บันทึก</Link></p>;
  }

  return (
    <form onSubmit={updatePassword} className="grid gap-4">
      <div>
        <label htmlFor="new-password" className="mb-2 block text-sm font-medium">รหัสผ่านใหม่</label>
        <input id="new-password" type="password" autoComplete="new-password" required minLength={8} value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
        <p className="mt-1 text-xs text-muted">อย่างน้อย 8 ตัวอักษร</p>
      </div>
      <div>
        <label htmlFor="confirm-new-password" className="mb-2 block text-sm font-medium">ยืนยันรหัสผ่านใหม่</label>
        <input id="confirm-new-password" type="password" autoComplete="new-password" required minLength={8} value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p>}
      <button type="submit" disabled={pending} className="primary-button w-full disabled:cursor-wait disabled:opacity-60">
        {pending ? "กำลังบันทึก…" : "ตั้งรหัสผ่านใหม่"}
      </button>
    </form>
  );
}
