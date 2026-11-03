"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DormIllustration from "@/components/DormIllustration";
import { dormitoryImages } from "@/data/dormitory-images";

export default function DormPhoto({ dormitoryId, large = false, eager = large }: { dormitoryId: string; large?: boolean; eager?: boolean }) {
  const photo = dormitoryImages[dormitoryId];
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
      <button type="button" onClick={() => setIsOpen(true)} aria-label={`เปิดรูปขนาดเต็ม: ${photo.alt}`} aria-haspopup="dialog" className={`relative block w-full overflow-hidden bg-brand-soft text-left ${large ? "h-64 sm:h-96" : "h-52 sm:h-56"}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={large ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
          quality={85}
          loading={eager ? "eager" : "lazy"}
          className="object-contain object-center"
          onError={() => setFailedSrc(photo.src)}
        />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`รูปขนาดเต็ม: ${photo.alt}`} onClick={() => setIsOpen(false)}>
          <div className="relative h-[90dvh] w-[96vw] max-w-7xl" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="absolute right-0 top-0 z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              ปิด <span aria-hidden="true">✕</span>
            </button>
            <Image src={photo.src} alt={photo.alt} fill sizes="96vw" quality={90} className="object-contain object-center" />
          </div>
        </div>
      )}
    </figure>
  );
}
