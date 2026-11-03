"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";
import { isRegistrationEnabled } from "@/lib/supabase/config";

export default function AccountMenu() {
  const { client, user, loading } = useSupabaseAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  if (loading) {
    return <span className="text-xs text-muted" aria-live="polite">กำลังตรวจสอบบัญชี</span>;
  }

  if (!user) {
    return (
      <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
        <Link href="/login" className="rounded-lg border border-line px-2.5 py-1.5 text-xs font-medium text-brand hover:bg-brand-soft sm:px-3 sm:py-2 sm:text-sm">เข้าสู่ระบบ</Link>
        {isRegistrationEnabled && <Link href="/register" className="rounded-lg bg-brand px-2.5 py-1.5 text-xs font-medium text-white hover:bg-brand-dark sm:px-3 sm:py-2 sm:text-sm">สร้างบัญชี</Link>}
      </div>
    );
  }

  async function signOut() {
    if (!client || signingOut) return;
    setSigningOut(true);
    setError("");
    try {
      const { error: signOutError } = await client.auth.signOut();
      if (signOutError) {
        setError("ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง");
      } else {
        dialogRef.current?.close();
      }
    } catch {
      setError("ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2 text-xs sm:text-sm">
      <Link href="/saved" className="rounded-lg px-2 py-1.5 font-medium text-brand hover:bg-brand-soft sm:py-2">รายการที่บันทึก</Link>
      <button type="button" aria-haspopup="dialog" onClick={() => { setError(""); dialogRef.current?.showModal(); }} className="rounded-lg border border-line px-2.5 py-1.5 text-muted hover:border-brand hover:text-brand sm:px-3 sm:py-2">ออกจากระบบ</button>
      <dialog ref={dialogRef} aria-labelledby="sign-out-title" aria-describedby="sign-out-description" className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-line bg-white p-6 text-foreground shadow-xl backdrop:bg-slate-900/50">
        <h2 id="sign-out-title" className="text-lg font-bold">ออกจากระบบ?</h2>
        <p id="sign-out-description" className="mt-2 text-sm leading-6 text-muted">คุณต้องเข้าสู่ระบบอีกครั้งเพื่อดูหอพักที่บันทึกไว้</p>
        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" disabled={signingOut} onClick={() => dialogRef.current?.close()} className="rounded-lg border border-line px-4 py-2 font-medium text-foreground hover:bg-surface disabled:opacity-60">ยกเลิก</button>
          <button type="button" disabled={signingOut} onClick={signOut} className="rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-60">{signingOut ? "กำลังออกจากระบบ…" : "ยืนยันออกจากระบบ"}</button>
        </div>
      </dialog>
    </div>
  );
}
