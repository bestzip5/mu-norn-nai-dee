"use client";

import Link from "next/link";
import { useState } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

export default function AccountMenu() {
  const { client, user, loading } = useSupabaseAuth();
  const [error, setError] = useState("");

  if (loading) {
    return <span className="text-xs text-muted" aria-live="polite">กำลังตรวจสอบบัญชี</span>;
  }

  if (!user) {
    return <Link href="/login" className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-brand hover:bg-brand-soft">เข้าสู่ระบบ</Link>;
  }

  async function signOut() {
    setError("");
    const { error: signOutError } = await client?.auth.signOut() ?? {};
    if (signOutError) setError("ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง");
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
      <Link href="/saved" className="rounded-lg px-2 py-2 font-medium text-brand hover:bg-brand-soft">รายการที่บันทึก</Link>
      <button type="button" onClick={signOut} className="rounded-lg border border-line px-3 py-2 text-muted hover:border-brand hover:text-brand">ออกจากระบบ</button>
      {error && <span role="alert" className="w-full text-right text-xs text-red-700">{error}</span>}
    </div>
  );
}
