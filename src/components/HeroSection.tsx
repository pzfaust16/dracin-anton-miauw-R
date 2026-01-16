import { Sparkles, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface HeroSectionProps {
  title: string;
  description: string;
  icon?: "sparkles" | "trending" | "clock";
}

const icons = {
  sparkles: Sparkles,
  trending: TrendingUp,
  clock: Clock,
};

export function HeroSection({ title, description, icon = "sparkles" }: HeroSectionProps) {
  const IconComponent = icons[icon];
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const imageUrl = "https://images.unsplash.com/photo-1572188863110-46d457c9234d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
      className="relative pt-24 pb-8 md:pt-28 md:pb-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-30"
          style={{ background: 'var(--gradient-glow)' }} />
      </div>

      {/* Background Image using div + optimized Image for preload */}
      <div
        className="absolute inset-0 z-[-1] h-full"
        // style={{
        //   backgroundImage: `url(${imageUrl})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        // }}
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
        priority
        className="hidden"
        unoptimized // optional: remove if you want Next.js to optimize it
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-white/30">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
        <p className="text-white text-lg max-w-2xl drop-shadow-md">
          {description}
        </p>
      </div>
    </div>
  );
}