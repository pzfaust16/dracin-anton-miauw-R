import Link from "next/link";
import { Play, Flame } from "lucide-react";
import type { Drama } from "@/types/drama";

interface DramaCardProps {
  drama: Drama;
  index?: number;
}

export function DramaCard({ drama, index = 0 }: DramaCardProps) {
  const coverUrl = drama.coverWap || drama.cover;
  const tags = drama.tags || drama.tagNames || [];

  return (
    <Link
      href={`/detail/${drama.bookId}`}
      className="border border-gray-700 group relative rounded-2xl overflow-hidden block animate-fade-up transition-all duration-500 p-3 cursor-pointer bg-neutral-950"
      style={{
        animationDelay: `${index * 50}ms`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)";
        e.currentTarget.style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Cover Image */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={coverUrl}
          alt={drama.bookName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

        {/* Corner Badge */}
        {drama.corner && (
          <div
            className="absolute top-3 left-3 badge-popular"
            style={{ backgroundColor: drama.corner.color }}
          >
            {drama.corner.name}
          </div>
        )}

        {/* Rank Badge */}
        {drama.rankVo && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm">
            <Flame className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-bold">{drama.rankVo.hotCode}</span>
          </div>
        )}

        {/* Episode Count */}
        <div className="absolute bottom-3 left-3 episode-count">
          <Play className="w-3 h-3 text-primary" />
          <span>{drama.chapterCount} Episode</span>
        </div>

        {/* Play Count */}
        {drama.playCount && (
          <div className="absolute bottom-3 right-3 play-count">
            <span>{drama.playCount} views</span>
          </div>
        )}

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-14 h-14 rounded-full bg-orange-400/40 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <Play className="w-6 h-6 text-orange-600 fill-orange-600 ml-1" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-display font-semibold text-orange-200 line-clamp-2 leading-tight group-hover:text-orange-400 transition-colors">
          {drama.bookName}
        </h3>

        {drama.protagonist && (
          <p className="text-xs text-muted-foreground truncate">
            {drama.protagonist}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)",
        }}
      />
    </Link>
  );
}