"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dormitories } from "@/data/dormitories";
import DormCard from "@/components/DormCard";
import { favoritesChangedEvent } from "@/components/FavoriteButton";
import { useSupabaseAuth } from "@/components/SupabaseAuthProvider";

async function getFavoriteIds(client: NonNullable<ReturnType<typeof useSupabaseAuth>["client"]>, userId: string) {
  const { data, error } = await client
    .from("favorites")
    .select("dormitory_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return {
    ids: error ? [] : (data ?? []).map((favorite) => favorite.dormitory_id),
    error: error ? "โหลดรายการที่บันทึกไม่สำเร็จ ตรวจสอบการตั้งค่าฐานข้อมูลแล้วลองอีกครั้ง" : "",
  };
}

export default function SavedDormitories() {
  const { client, user, loading, configured } = useSupabaseAuth();
  const [ids, setIds] = useState<string[]>([]);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [retryVersion, setRetryVersion] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!client || !user) return;
    let active = true;
    const load = () => getFavoriteIds(client, user.id).then((result) => {
      if (!active) return;
      setIds(result.ids);
      setError(result.error);
      setLoadedUserId(user.id);
    });
    void load();
    const refresh = () => {
      setRefreshing(true);
      void load().finally(() => setRefreshing(false));
    };
    window.addEventListener(favoritesChangedEvent, refresh);
    return () => {
      active = false;
      window.removeEventListener(favoritesChangedEvent, refresh);
    };
  }, [client, user, retryVersion]);

  if (!configured) {
    return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">ระบบบันทึกหอพักยังไม่ได้เชื่อมต่อ Supabase</p>;
  }
  if (loading || refreshing) {
    return <p className="text-sm text-muted" role="status">กำลังโหลดรายการที่บันทึก…</p>;
  }
  if (!user) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center">
        <p className="text-sm leading-6 text-muted">เข้าสู่ระบบเพื่อดูรายการหอพักที่บันทึกไว้</p>
        <Link href={`/login?next=${encodeURIComponent("/saved")}`} className="primary-button mt-4">เข้าสู่ระบบ</Link>
      </div>
    );
  }
  if (loadedUserId !== user.id) {
    return <p className="text-sm text-muted" role="status">กำลังโหลดรายการที่บันทึก…</p>;
  }
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-6 text-center">
        <p role="alert" className="text-sm text-red-800">{error}</p>
        <button type="button" onClick={() => setRetryVersion((version) => version + 1)} className="mt-4 text-sm font-medium text-brand hover:underline">ลองอีกครั้ง</button>
      </div>
    );
  }

  const savedDormitories = ids.flatMap((id) => {
    const dormitory = dormitories.find((item) => item.id === id);
    return dormitory ? [dormitory] : [];
  });

  if (!savedDormitories.length) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center">
        <p className="text-sm leading-6 text-muted">ยังไม่มีหอพักที่บันทึกไว้</p>
        <Link href="/dorms?area=all" className="primary-button mt-4">ค้นหาหอพัก</Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {savedDormitories.map((dormitory, index) => (
        <li key={dormitory.id}><DormCard dormitory={dormitory} eager={index < 3} /></li>
      ))}
    </ul>
  );
}
