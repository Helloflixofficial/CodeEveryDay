import Image from "next/image";
import Link from "next/link";
import { Play, Star, Mic2, Subtitles, Calendar, Clock } from "lucide-react";
import { getInfo } from "../lib/anime";
import { getEpisodes } from "../lib/anime";

type AnimeBasic = {
  id: string;
  poster: string;
  title: string;
  tvInfo?: {
    eps?: number;
    showType?: string;
    episodeInfo?: { sub: number; dub: number };
    sub?: number;
    dub?: number;
    releaseDate?: string;
  };
};

export default async function HeroSection({ anime }: { anime?: AnimeBasic }) {
  if (!anime) return null;

  // Fetch detailed info for rating and genres
  let detailedInfo = null;
  let firstEpisode = null;
  try {
    const [info, episodes] = await Promise.all([
      getInfo(anime.id).catch(() => null),
      getEpisodes(anime.id).catch(() => null),
    ]);
    detailedInfo = info?.data || info || null;
    firstEpisode = episodes?.episodes?.[0] || null;
  } catch (e) {
    // Silently fail if info fetch fails - use basic data from anime prop
  }

  const hasEpisodeInfo = anime.tvInfo?.episodeInfo;
  const subCount = hasEpisodeInfo
    ? anime.tvInfo!.episodeInfo!.sub
    : anime.tvInfo?.sub || 0;
  const dubCount = hasEpisodeInfo
    ? anime.tvInfo!.episodeInfo!.dub
    : anime.tvInfo?.dub || 0;
  const totalEpisodes = anime.tvInfo?.eps || subCount + dubCount || 0;
  const yearMatch = anime.tvInfo?.releaseDate?.match(/(\d{4})/);
  const year = yearMatch ? parseInt(yearMatch[1]) : undefined;
  const genres = detailedInfo?.animeInfo?.Genres || [];
  const rating = detailedInfo?.animeInfo?.Rating || detailedInfo?.rating;

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden mb-8 md:mb-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-3 md:px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight line-clamp-3">
            {anime.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
            {rating && (
              <div className="flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="font-semibold">{rating}</span>
              </div>
            )}
            {year && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{year}</span>
              </div>
            )}
            {totalEpisodes > 0 && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{totalEpisodes} eps</span>
              </div>
            )}
            {dubCount > 0 && (
              <div className="flex items-center gap-1.5 bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full border border-purple-500/30">
                <Mic2 className="h-4 w-4" />
                <span>DUB</span>
              </div>
            )}
            {subCount > 0 && (
              <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30">
                <Subtitles className="h-4 w-4" />
                <span>SUB</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 5).map((g: any) => (
                <span
                  key={g.name || g}
                  className="px-3 py-1 bg-muted/50 backdrop-blur-sm rounded-full text-xs md:text-sm border border-border/50"
                >
                  {g.name || g}
                </span>
              ))}
            </div>
          )}

          {/* Watch Now Button */}
          {firstEpisode && (
            <Link
              href={`/anime/${anime.id}/episode/${firstEpisode.id}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Play className="h-5 w-5 md:h-6 md:w-6" />
              Play Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
