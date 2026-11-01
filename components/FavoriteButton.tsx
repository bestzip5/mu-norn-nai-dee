"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

export const favoritesChangedEvent = "mu-norn-nai-dee:favorites-changed";

export default function FavoriteButton({ dormitoryId }: { dormitoryId: string }) {
  const { client, user, loading, configured } = useSupabaseAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [savedState, setSavedState] = useState<{ userId: string; isSaved: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const isSaved = Boolean(user && savedState?.userId === user.id && savedState.isSaved);

  useEffect(() => {
    let active = true;
    if (!client || !user) return () => { active = false; };

    client
      .from("favorites")
      .select("dormitory_id")
      .eq("user_id", user.id)
      .eq("dormitory_id", dormitoryId)
      .maybeSingle()
      .then(({ data, error: queryError }) => {
        if (!active) return;
        setSavedState({ userId: user.id, isSaved: Boolean(data) });
        if (queryError) setError("ตรวจสอบรายการที่บันทึกไม่สำเร็จ");
      });

    return () => { active = false; };
  }, [client, user, dormitoryId]);

  async function toggleFavorite() {
    if (loading || isSaving) return;
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname || "/dorms")}`);
      return;
    }
    if (!client || !configured) {
      router.push(`/login?next=${encodeURIComponent(pathname || "/dorms")}`);
      return;
    }

    setIsSaving(true);
    setError("");
    const result = isSaved
      ? await client.from("favorites").delete().eq("user_id", user.id).eq("dormitory_id", dormitoryId)
      : await client.from("favorites").insert({ user_id: user.id, dormitory_id: dormitoryId });

    setIsSaving(false);
    if (result.error) {
      setError("บันทึกรายการไม่สำเร็จ กรุณาลองอีกครั้ง");
      return;
    }

    setSavedState({ userId: user.id, isSaved: !isSaved });
    window.dispatchEvent(new Event(favoritesChangedEvent));
  }

  const label = loading
    ? "กำลังตรวจสอบบัญชี"
    : isSaving
      ? "กำลังบันทึก"
      : isSaved
        ? "บันทึกแล้ว · นำออก"
        : user
          ? "บันทึกหอพัก"
          : "เข้าสู่ระบบเพื่อบันทึก";

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={toggleFavorite}
        disabled={loading || isSaving}
        aria-pressed={isSaved}
        aria-label={`${isSaved ? "นำออกจากรายการที่บันทึก" : "บันทึกหอพัก"}: ${dormitoryId}`}
        className={`inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${isSaved ? "border-brand bg-brand-soft text-brand-dark" : "border-line bg-white text-brand hover:border-brand hover:bg-brand-soft"}`}
      >
        <span aria-hidden="true" className="mr-1">{isSaved ? "★" : "☆"}</span>
        {label}
      </button>
      {error && <p role="alert" className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
