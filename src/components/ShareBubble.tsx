"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ShareBubble() {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;
    const text = "Cek drama seru ini di MaoMao!";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        toast.success("Berhasil membagikan link!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link disalin ke clipboard!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast.error("Gagal menyalin link.");
      }
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-white text-black px-4 py-2 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 origin-bottom-right ${
          isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2 pointer-events-none"
        }`}
      >
        Suka? Bagikan ke temenmu ya
      </div>
      <button
        onClick={handleShare}
        className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Bagikan"
      >
        <img src="/logo.svg" alt="Share" className="w-12 h-12 bg-white rounded-full" />
      </button>
    </div>
  );
}
