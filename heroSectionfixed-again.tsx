"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Star,
  Mic2,
  Subtitles,
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "./ui/button";
import { getInfo, getEpisodes } from "../lib/anime";

export type AnimeBasic = {
  id: string;
  poster: string;
  title: string;
  description?: string;
  tvInfo?: {
    eps?: number;
    episodeInfo?: { sub: number; dub: number };
    sub?: number;
    dub?: number;
    releaseDate?: string;
  };
};

type HeroSectionProps = {
  spotlights: AnimeBasic[];
};

export default function HeroSection({ spotlights }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [firstEpisode, setFirstEpisode] = useState<any>(null);

  const hasSpotlights = spotlights.length > 0;
  const currentAnime = hasSpotlights ? spotlights[currentSlide] : null;

  // Fetch detailed info for current anime
  useEffect(() => {
    if (!currentAnime) return;
    const fetchDetails = async () => {
      try {
        const [info, ep] = await Promise.all([
          getInfo(currentAnime.id).catch(() => null),
          getEpisodes(currentAnime.id).catch(() => null),
        ]);
        setDetails(info?.data || info || null);
        setFirstEpisode(ep?.episodes?.[0] || null);
      } catch {}
    };
    fetchDetails();
  }, [currentAnime]);

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying || !hasSpotlights) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % spotlights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, hasSpotlights, spotlights.length]);

  const nextSlide = () => {
    if (!hasSpotlights) return;
    setCurrentSlide((prev) => (prev + 1) % spotlights.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (!hasSpotlights) return;
    setCurrentSlide((prev) => (prev - 1 + spotlights.length) % spotlights.length);
    setIsAutoPlaying(false);
  };

  if (!hasSpotlights || !currentAnime) {
    return (
      <section className="w-full h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">No spotlight data.</p>
      </section>
    );
  }

  // Episode info
  const hasEp = currentAnime.tvInfo?.episodeInfo;
  const sub = hasEp ? currentAnime.tvInfo!.episodeInfo!.sub : currentAnime.tvInfo?.sub || 0;
  const dub = hasEp ? currentAnime.tvInfo!.episodeInfo!.dub : currentAnime.tvInfo?.dub || 0;
  const totalEps = currentAnime.tvInfo?.eps || sub + dub;

  const yearMatch = currentAnime.tvInfo?.releaseDate?.match(/(\d{4})/);
  const year = yearMatch ? parseInt(yearMatch[1]) : undefined;

  const genres = details?.animeInfo?.Genres || [];
  const rating = details?.animeInfo?.Rating || details?.rating;

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden mb-10">
      {/* Background */}
      <div className="absolute inset-0">
        {spotlights.map((anime, index) => (
          <div
            key={anime.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-full h-full object-cover"
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold line-clamp-3">{currentAnime.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            {rating && (
              <div className="flex items-center gap-1 bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>{rating}</span>
              </div>
            )}
            {year && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{year}</span>
              </div>
            )}
            {totalEps > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{totalEps} eps</span>
              </div>
            )}
            {dub > 0 && (
              <div className="flex items-center gap-1 bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full border border-purple-500/30">
                <Mic2 className="h-4 w-4" />
                <span>DUB</span>
              </div>
            )}
            {sub > 0 && (
              <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30">
                <Subtitles className="h-4 w-4" />
                <span>SUB</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 5).map((g: any) => (
                <span key={g.name || g} className="px-3 py-1 bg-muted/50 rounded-full border text-sm">
                  {g.name || g}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {currentAnime.description && (
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3 max-w-xl hidden sm:block">
              {currentAnime.description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            {firstEpisode && (
              <Link href={`/anime/${currentAnime.id}/episode/${firstEpisode.id}`}>
                <Button className="bg-primary text-primary-foreground px-6 py-2">
                  <Play className="mr-2 h-5 w-5" /> Watch Now
                </Button>
              </Link>
            )}
            <Button variant="outline" className="px-6 py-2">
              <Plus className="mr-2 h-5 w-5" /> Add to List
            </Button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20" onClick={prevSlide}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20" onClick={nextSlide}>
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {spotlights.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-primary scale-125" : "bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
