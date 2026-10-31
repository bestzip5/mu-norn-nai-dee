"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";
import { isRegistrationEnabled } from "@/lib/supabase/config";

export default function LoginForm({ nextPath }: { nextPath: string }) {
  const { client, configured } = useSupabaseAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !configured || pending) return;
    setPending(true);
    setError("");
    const { error: signInError } = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setPending(false);
    if (signInError) {
      setError("เข้าสู่ระบบไม่สำเร็จ ตรวจสอบอีเมลและรหัสผ่าน หรือยืนยันอีเมลก่อนลองอีกครั้ง");
      return;
    }
    router.replace(nextPath);
    router.refresh();
  }

  if (!configured) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบสมาชิกยังไม่ได้เชื่อมต่อ Supabase ตั้งค่า URL และ publishable key ในไฟล์ .env.local ก่อนใช้งาน</p>;
  }

  return (
    <form onSubmit={signIn} className="grid gap-4">
      <div>
        <label htmlFor="login-email" className="mb-2 block text-sm font-medium">อีเมล</label>
        <input id="login-email" type="email" autoComplete="email" required value={email}
          onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-2 block text-sm font-medium">รหัสผ่าน</label>
        <input id="login-password" type="password" autoComplete="current-password" required value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p>}
      <button type="submit" disabled={pending} className="primary-button w-full disabled:cursor-wait disabled:opacity-60">
        {pending ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
      </button>
      <div className="flex flex-wrap justify-between gap-2 text-sm">
        {isRegistrationEnabled && <Link href={"/register?next=" + encodeURIComponent(nextPath)} className="font-medium text-brand hover:underline">สร้างบัญชีใหม่</Link>}
        <Link href="/forgot-password" className="font-medium text-brand hover:underline">ลืมรหัสผ่าน?</Link>
      </div>
    </form>
  );
}
