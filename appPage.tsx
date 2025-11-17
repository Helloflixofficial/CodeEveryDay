import {
  TrendingUp,
  Flame,
  Star,
  Heart,
  CheckCircle,
  Clock,
} from "lucide-react";
import AnimeSectionGrid from "@/components/AnimeSectionGrid";
import HeroSection, { AnimeBasic } from "@/components/HeroSection";
import { getHomeData } from "@/lib/api";

export const revalidate = 300;

export default async function Page() {
  // Fetch all home data once
  const homeData = await getHomeData();
  const spotlights: AnimeBasic[] = homeData.spotlights || [];

  return (
    <>
      {/* Hero Spotlight Section */}
      <HeroSection spotlights={spotlights} />

      {/* Core sections below */}
      <AnimeSectionGrid
        title="Trending Now"
        subtitle="Most watched anime this week"
        icon={TrendingUp}
        animeList={homeData?.trending || []}
        viewAllLink="/trending"
        loading={!homeData}
        showRank
        limit={18}
      />
      <AnimeSectionGrid
        title="Top Airing"
        subtitle="Currently broadcasting anime"
        icon={Flame}
        animeList={homeData?.topAiring || []}
        viewAllLink="/tv-series"
        loading={!homeData}
        limit={12}
      />
      <AnimeSectionGrid
        title="Most Popular"
        subtitle="Fan favorites of all time"
        icon={Star}
        animeList={homeData?.mostPopular || []}
        viewAllLink="/most-popular"
        loading={!homeData}
        limit={12}
      />
      <AnimeSectionGrid
        title="Most Favorite"
        subtitle="Highest rated by the community"
        icon={Heart}
        animeList={homeData?.mostFavorite || []}
        loading={!homeData}
        limit={12}
      />
      <AnimeSectionGrid
        title="Recently Completed"
        subtitle="Finished airing anime"
        icon={CheckCircle}
        animeList={homeData?.latestCompleted || []}
        loading={!homeData}
        limit={12}
      />
      <AnimeSectionGrid
        title="Latest Episodes"
        subtitle="Newest episodes released"
        icon={Clock}
        animeList={homeData?.latestEpisode || []}
        loading={!homeData}
        limit={18}
      />
    </>
  );
}
