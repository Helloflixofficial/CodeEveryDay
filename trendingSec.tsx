import { useState, useEffect } from "react";
import { TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AnimeCard from "./AnimeCard";
import { getHomeData } from "@/services/animeApi";
import type { AnimeBasic } from "@/types/anime";

const TrendingSection = () => {
  const [trending, setTrending] = useState<AnimeBasic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getHomeData();
        setTrending(data.trending || []);
      } catch (error) {
        console.error('Failed to fetch trending data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <section className="py-4 md:py-8 lg:py-12">
        <div className="container px-3 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-4 md:py-8 lg:py-12">
      <div className="container px-3 md:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Trending Now</h2>
              <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">Most watched anime this week</p>
            </div>
          </div>
          
          <Button variant="ghost" className="hidden sm:flex h-8 md:h-10 text-sm" asChild>
            <Link to="/most-popular">
              View All
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Trending Grid - Responsive: 2 mobile, 4 tablet, 6 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
          {trending.slice(0, 18).map((anime, index) => {
            const hasEpisodeInfo = anime.tvInfo?.episodeInfo;
            const subCount = hasEpisodeInfo ? anime.tvInfo.episodeInfo.sub : anime.tvInfo?.sub || 0;
            const dubCount = hasEpisodeInfo ? anime.tvInfo.episodeInfo.dub : anime.tvInfo?.dub || 0;
            const totalEpisodes = anime.tvInfo?.eps || subCount + dubCount;
            
            // Extract year from releaseDate if available
            const yearMatch = anime.tvInfo?.releaseDate?.match(/(\d{4})/);
            const yearNumber = yearMatch ? parseInt(yearMatch[1]) : undefined;

            return (
              <div key={anime.id} className="relative group">
                {/* Rank Number */}
                <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 z-10 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs md:text-sm shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <AnimeCard
                  id={anime.id}
                  title={anime.title}
                  image={anime.poster}
                  rating={0}
                  year={yearNumber}
                  episodes={totalEpisodes}
                  type={anime.tvInfo?.showType || 'TV'}
                  status="Ongoing"
                  genres={[]}
                  subtitle={subCount > 0 ? 'SUB' : undefined}
                  isDubbed={dubCount > 0}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-6 sm:hidden">
          <Button variant="outline" className="w-full max-w-xs text-sm" asChild>
            <Link to="/most-popular">
              View All Trending
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
