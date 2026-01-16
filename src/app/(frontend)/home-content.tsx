"use client";

import { HeroSection } from "@/components/HeroSection";
import { DramaGrid } from "@/components/DramaGrid";
import { useForYouDramas } from "@/hooks/useDramas";

export default function HomeContent() {
  const { data: dramas, isLoading, error } = useForYouDramas();

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 mt-12">
        <HeroSection
          title="Untuk Kamu"
          description="Drama pilihan yang dipersonalisasi khusus untukmu. Temukan cerita seru yang sesuai selera!"
          icon="sparkles"
        />
      </div>


      <div className="container mx-auto px-4 p-6">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3 p-4">
          <span className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-800 rounded-full"></span>
          <span className="bg-gradient-to-r from-orange-600 to-orange-300 inline-block text-transparent bg-clip-text font-extrabold p-2">TERPOPULER</span>
          MINGGU INI
        </h3>
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Gagal memuat drama. Silakan coba lagi.</p>
          </div>
        )}

        <DramaGrid dramas={dramas} isLoading={isLoading} />
      </div>
    </main>
  );
}
