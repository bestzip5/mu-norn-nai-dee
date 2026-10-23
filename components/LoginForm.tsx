"use client";

import { useState, type FormEvent } from "react";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

export default function LoginForm({ nextPath }: { nextPath: string }) {
  const { client, configured } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function requestSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !configured || pending) return;

    setPending(true);
    setMessage("");
    setError("");
    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", nextPath);

    const { error: signInError } = await client.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo.toString() },
    });

    setPending(false);
    if (signInError) {
      setError("ส่งลิงก์เข้าสู่ระบบไม่สำเร็จ ตรวจสอบอีเมลแล้วลองอีกครั้ง");
      return;
    }
    setMessage("ส่งลิงก์เข้าสู่ระบบไปยังอีเมลแล้ว กรุณาเปิดลิงก์เพื่อกลับมายังเว็บไซต์");
  }

  if (!configured) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        ระบบบันทึกหอพักยังไม่ได้เชื่อมต่อ Supabase ตั้งค่า URL และ publishable key ตามไฟล์ .env.example ก่อนเปิดใช้การล็อกอิน
      </div>
    );
  }

  return (
    <form onSubmit={requestSignIn} className="grid gap-4">
      <div>
        <label htmlFor="login-email" className="mb-2 block text-sm font-medium">อีเมล</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm"
        />
      </div>
      {message && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm leading-6 text-green-800">{message}</p>}
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p>}
      <button type="submit" disabled={pending} className="primary-button w-full disabled:cursor-wait disabled:opacity-60">
        {pending ? "กำลังส่งลิงก์…" : "ส่งลิงก์เข้าสู่ระบบ"}
      </button>
      <p className="text-xs leading-5 text-muted">เราใช้ลิงก์ทางอีเมล ไม่ต้องตั้งหรือจดจำรหัสผ่าน</p>
    </form>
  );
}
