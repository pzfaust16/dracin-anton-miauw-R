import { Sparkles, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  tagline?: string;
  heroImage?: string;
  websiteName?: string;
  icon?: "sparkles" | "trending" | "clock";
}

const icons = {
  sparkles: Sparkles,
  trending: TrendingUp,
  clock: Clock,
};

export function HeroSection({ title, websiteName, description, tagline, heroImage, icon = "sparkles" }: HeroSectionProps) {
  const IconComponent = icons[icon];
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const imageUrl = heroImage || '/poster_beranda.jpg'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePos({ x, y });

    // Calculate distance from center (0.5, 0.5)
    const distX = Math.abs(x - 0.5);
    const distY = Math.abs(y - 0.5);
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Scale between 1 and 1.15 based on distance (closer = more zoom)
    const newScale = 1 + (0.15 * (1 - Math.min(distance, 0.7) / 0.7));
    setScale(newScale);
  };
  return (
    <div
      // className="relative pt-24 pb-8 md:pt-28 md:pb-12"
      className="relative w-full h-[480px] rounded-[2.5rem] overflow-hidden group border border-white/10 shadow-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseMove}
      ref={containerRef}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-30"
          style={{ background: 'var(--gradient-glow)' }} />
      </div>

      {/* Background Image using div + optimized Image for preload */}
      <div
        className="absolute inset-0 z-[-1] h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `scale(${scale})`,
          transformOrigin: `${mousePos.x * 100}% ${mousePos.y * 100}%`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-1 bg-black/40" />

      {/* Hidden Image for Next.js optimization and caching */}
      <Image
        src={imageUrl}
        alt="Hero background"
        width={1170}
        height={600}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 hidden"
      />

      <div className="absolute bottom-10 left-10 max-w-lg">
        <span className="badge-popular mb-4 inline-block">
          {tagline || "HOT RELEASE"}
        </span>
        <h2 className="text-4xl md:text-6xl mb-4 leading-tight">
          {title}
          <span className="bg-gradient-to-r from-orange-600 to-orange-300 inline-block text-transparent bg-clip-text text-6xl font-extrabold">{websiteName}</span>
        </h2>
        <p className="text-white text-sm mb-6 line-clamp-2">{description}</p>
        <Button className="bg-gradient-to-r from-[#EE4d2d] to-[#ffca28] rounded-2xl text-sm transition active:scale-95 shadow-lg" asChild>
          <Link href={'/terbaru'}>Nonton Sekarang</Link>
        </Button>
      </div>
    </div>
  );
}