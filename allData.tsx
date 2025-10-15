import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchHomeData } from "@/lib/api";

interface AnimeItem {
  id: string;
  title: string;
  japanese_title?: string;
  poster: string;
  description?: string;
  tvInfo?: {
    showType?: string;
    duration?: string;
    sub?: number;
    dub?: number;
  };
  number?: number;
}

interface HomeProps {
  spotlights: AnimeItem[];
  trending: AnimeItem[];
  topAiring: AnimeItem[];
  mostPopular: AnimeItem[];
  latestEpisodes: AnimeItem[];
  error?: string;
}

export default function Home({
  spotlights = [],
  trending = [],
  topAiring = [],
  mostPopular = [],
  latestEpisodes = [],
  error,
}: HomeProps) {
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">⚠️ Error</h1>
          <p className="text-gray-300 text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold mt-4"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  // Beautiful Anime Card Component
  const AnimeCard = ({ anime, rank }: { anime: AnimeItem; rank?: number }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <div className="group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-red-500">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-700">
          {!imageError && anime.poster ? (
            <img
              src={anime.poster}
              alt={anime.title || "Anime"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-5xl mb-3">🎌</div>
                <div className="text-white text-xs font-bold line-clamp-2 px-2">
                  {anime.title}
                </div>
              </div>
            </div>
          )}

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          {/* Rank Badge */}
          {rank && (
            <div className="absolute top-3 left-3 z-20">
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-white">
                #{rank}
              </div>
            </div>
          )}

          {/* Episode Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            {anime.tvInfo?.sub && anime.tvInfo.sub > 0 && (
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-green-400">
                SUB {anime.tvInfo.sub}
              </div>
            )}
            {anime.tvInfo?.dub && anime.tvInfo.dub > 0 && (
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-blue-400">
                DUB {anime.tvInfo.dub}
              </div>
            )}
            {anime.tvInfo?.showType && (
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-purple-400">
                {anime.tvInfo.showType}
              </div>
            )}
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-black/40">
            <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300 border-4 border-white">
              <div className="text-2xl ml-1">▶️</div>
            </div>
          </div>

          {/* Quality Badge */}
          <div className="absolute bottom-3 left-3 z-20">
            <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-lg">
              HD
            </div>
          </div>
        </div>

        {/* Info Container */}
        <div className="p-4 space-y-2">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 group-hover:text-red-400 transition-colors duration-200 min-h-[2.5rem]">
            {anime.title || "Unknown Title"}
          </h3>

          {anime.japanese_title && (
            <p className="text-gray-400 text-xs line-clamp-1 italic">
              {anime.japanese_title}
            </p>
          )}

          <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-700">
            <span className="text-gray-500 font-medium">
              {anime.tvInfo?.showType || "TV"}
            </span>
            <span className="text-gray-500">
              {anime.tvInfo?.duration || "24m"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>HiAnime - Watch Anime Online Free</title>
        <meta
          name="description"
          content="Watch thousands of anime online free in HD quality"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Beautiful Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-8 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl shadow-2xl mb-8">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                🎌 <span className="text-yellow-400">Hi</span>Anime
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 font-medium">
                Watch thousands of anime episodes online free
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 inline-block border border-gray-600">
              <p className="text-lg text-green-400 font-bold">
                ✅{" "}
                {spotlights.length +
                  trending.length +
                  topAiring.length +
                  mostPopular.length +
                  latestEpisodes.length}{" "}
                Anime Loaded Successfully!
              </p>
            </div>
          </div>

          {/* Featured/Spotlight Section */}
          {spotlights.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                  <span className="text-4xl mr-4">🌟</span>
                  Featured Spotlight
                  <span className="ml-4 bg-red-600 text-white px-3 py-1 rounded-full text-lg font-black">
                    {spotlights.length}
                  </span>
                </h2>
              </div>

              {/* Large Featured Banner */}
              <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-12 shadow-2xl border-4 border-gray-700">
                {spotlights[0].poster ? (
                  <img
                    src={spotlights[0].poster}
                    alt={spotlights[0].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-9xl mb-6">🎬</div>
                      <h3 className="text-5xl font-bold text-white">
                        Featured Anime
                      </h3>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

                <div className="absolute inset-0 flex items-center">
                  <div className="p-8 md:p-16 max-w-3xl">
                    <div className="mb-6">
                      <span className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg border-2 border-white">
                        🔥 FEATURED ANIME
                      </span>
                    </div>

                    <h3 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                      {spotlights[0].title}
                    </h3>

                    {spotlights[0].japanese_title && (
                      <p className="text-xl md:text-3xl text-gray-200 mb-6 font-medium">
                        {spotlights[0].japanese_title}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mb-8">
                      {spotlights[0].tvInfo?.showType && (
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                          📺 {spotlights[0].tvInfo.showType}
                        </span>
                      )}
                      {spotlights[0].tvInfo?.sub &&
                        spotlights[0].tvInfo.sub > 0 && (
                          <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                            🇯🇵 SUB: {spotlights[0].tvInfo.sub}
                          </span>
                        )}
                      {spotlights[0].tvInfo?.dub &&
                        spotlights[0].tvInfo.dub > 0 && (
                          <span className="bg-yellow-600 text-black px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                            🇺🇸 DUB: {spotlights[0].tvInfo.dub}
                          </span>
                        )}
                      <span className="bg-purple-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                        ⭐ HD QUALITY
                      </span>
                    </div>

                    {spotlights[0].description && (
                      <p className="text-gray-200 text-lg mb-8 leading-relaxed line-clamp-3 max-w-2xl drop-shadow-lg">
                        {spotlights[0].description}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-red-400 flex items-center justify-center gap-3">
                        <span className="text-2xl">▶️</span>
                        WATCH NOW
                      </button>
                      <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-xl font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        ℹ️ MORE INFO
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spotlight Grid */}
              {spotlights.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                  {spotlights.slice(1).map((item, index) => (
                    <AnimeCard
                      key={item.id || `spotlight-${index}`}
                      anime={item}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Trending Section */}
          {trending.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                  <span className="text-4xl mr-4">📈</span>
                  Trending Now
                  <span className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-full text-lg font-black">
                    {trending.length}
                  </span>
                </h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {trending.map((item, index) => (
                  <AnimeCard
                    key={item.id || `trending-${index}`}
                    anime={item}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Top Airing Section */}
          {topAiring.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                  <span className="text-4xl mr-4">🔥</span>
                  Top Airing
                  <span className="ml-4 bg-orange-600 text-white px-3 py-1 rounded-full text-lg font-black">
                    {topAiring.length}
                  </span>
                </h2>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {topAiring.slice(0, 21).map((item, index) => (
                  <AnimeCard key={item.id || `airing-${index}`} anime={item} />
                ))}
              </div>
              {topAiring.length > 21 && (
                <div className="text-center mt-8">
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    Load More ({topAiring.length - 21} remaining) →
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Most Popular Section */}
          {mostPopular.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                  <span className="text-4xl mr-4">⭐</span>
                  Most Popular
                  <span className="ml-4 bg-purple-600 text-white px-3 py-1 rounded-full text-lg font-black">
                    {mostPopular.length}
                  </span>
                </h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {mostPopular.slice(0, 21).map((item, index) => (
                  <AnimeCard key={item.id || `popular-${index}`} anime={item} />
                ))}
              </div>
            </section>
          )}

          {/* Latest Episodes Section */}
          {latestEpisodes.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
                  <span className="text-4xl mr-4">🆕</span>
                  Latest Episodes
                  <span className="ml-4 bg-green-600 text-white px-3 py-1 rounded-full text-lg font-black">
                    {latestEpisodes.length}
                  </span>
                </h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {latestEpisodes.slice(0, 21).map((item, index) => (
                  <AnimeCard key={item.id || `latest-${index}`} anime={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const homeData = await fetchHomeData();

    if (!homeData?.results) {
      return {
        props: {
          spotlights: [],
          trending: [],
          topAiring: [],
          mostPopular: [],
          latestEpisodes: [],
          error: "Invalid API response structure",
        },
      };
    }

    const results = homeData.results;
    return {
      props: {
        spotlights: results.spotlights || [],
        trending: results.trending || [],
        topAiring: results.topAiring || [],
        mostPopular: results.mostPopular || [],
        latestEpisodes: results.latestEpisode || [],
      },
    };
  } catch (error) {
    console.error("Server Error:", error);
    return {
      props: {
        spotlights: [],
        trending: [],
        topAiring: [],
        mostPopular: [],
        latestEpisodes: [],
        error: `Server Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
    };
  }
};
