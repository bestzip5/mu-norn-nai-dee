"use client";

import Image from "next/image";
import { useState } from "react";
import DormIllustration from "@/components/DormIllustration";
import { dormitoryImages } from "@/data/dormitory-images";

export default function DormPhoto({ dormitoryId, large = false }: { dormitoryId: string; large?: boolean }) {
  const photo = dormitoryImages[dormitoryId];
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!photo || failedSrc === photo.src) {
    return (
      <figure className="relative">
        <DormIllustration large={large} />
        <figcaption className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs text-muted shadow-sm">
          ภาพประกอบ
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="relative">
      <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`เปิดรูปขนาดเต็ม: ${photo.alt}`} className={`relative block overflow-hidden bg-brand-soft ${large ? "h-64 sm:h-96" : "h-52 sm:h-56"}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={large ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
          quality={85}
          className={large || photo.fit === "contain" ? "object-contain" : "object-cover"}
          onError={() => setFailedSrc(photo.src)}
        />
      </a>
      {photo.pendingReview && <figcaption className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs text-muted shadow-sm">รอตรวจสอบรูปภาพ</figcaption>}
    </figure>
  );
}
