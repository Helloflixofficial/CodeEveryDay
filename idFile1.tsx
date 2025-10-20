import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchAnimeDetails } from "@/lib/api";

interface AnimeDetails {
  id: string;
  title: string;
  japanese_title?: string;
  poster: string;
  showType: string;
  animeInfo: {
    Overview: string;
    Japanese: string;
    Synonyms?: string;
    Aired: string;
    Premiered: string;
    Duration: string;
    Status: string;
    "MAL Score": string;
    Genres: string[];
    Studios: string;
    Producers: string[];
    tvInfo: {
      rating: string;
      quality: string;
      sub: string;
      dub: string;
      showType: string;
      duration: string;
    };
  };
  recommended_data: any[];
  related_data: any[];
}

interface AnimeDetailsProps {
  animeDetails: AnimeDetails | null;
  error?: string;
}

export default function AnimeDetailsPage({
  animeDetails,
  error,
}: AnimeDetailsProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl text-white mb-4">⚠️ Error</h1>
          <p className="text-gray-300 text-xl mb-6">{error}</p>
          <Link href="/">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold">
              🏠 Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!animeDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-6"></div>
          <h1 className="text-4xl text-white mb-4">Loading...</h1>
          <p className="text-gray-300">Fetching anime details...</p>
        </div>
      </div>
    );
  }

  const { animeInfo } = animeDetails;

  return (
    <>
      <Head>
        <title>{animeDetails.title} - HiAnime</title>
        <meta name="description" content={animeInfo.Overview} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header Navigation */}
        <div className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="text-gray-400 hover:text-white transition-colors">
                  ← Back to Home
                </button>
              </Link>
              <div className="text-gray-600">•</div>
              <div className="text-gray-400 text-sm">
                {animeDetails.showType} • {animeInfo.Status}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              {!imageError && animeDetails.poster ? (
                <img
                  src={animeDetails.poster}
                  alt={animeDetails.title}
                  className="w-full h-full object-cover blur-sm scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Poster */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-600">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                      {!imageError && animeDetails.poster ? (
                        <img
                          src={animeDetails.poster}
                          alt={animeDetails.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-4">🎌</div>
                            <div className="text-white font-bold">
                              {animeDetails.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3">
                        <span className="text-2xl">▶️</span>
                        <span>WATCH NOW</span>
                      </button>

                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2">
                        <span>➕</span>
                        <span>Add to Watchlist</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Title Section */}
                  <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                      {animeDetails.title}
                    </h1>
                    {animeDetails.japanese_title && (
                      <h2 className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
                        {animeDetails.japanese_title}
                      </h2>
                    )}
                    {animeInfo.Synonyms && (
                      <p className="text-gray-400 text-lg">
                        Also known as: {animeInfo.Synonyms}
                      </p>
                    )}
                  </div>

                  {/* Info Badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                      📺 {animeInfo.tvInfo.showType}
                    </span>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                      🇯🇵 SUB: {animeInfo.tvInfo.sub}
                    </span>
                    {parseInt(animeInfo.tvInfo.dub) > 0 && (
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                        🇺🇸 DUB: {animeInfo.tvInfo.dub}
                      </span>
                    )}
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">
                      {animeInfo.tvInfo.quality}
                    </span>
                    <span className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">
                      {animeInfo.tvInfo.rating}
                    </span>
                    <span className="bg-yellow-600 text-black px-4 py-2 rounded-lg font-bold">
                      ⏱️ {animeInfo.Duration}
                    </span>
                  </div>

                  {/* Genres */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {animeInfo.Genres.map((genre, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Overview
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {animeInfo.Overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Anime Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📊</span>
                Anime Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white font-semibold">
                    {animeInfo.Status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Aired:</span>
                  <span className="text-white font-semibold">
                    {animeInfo.Aired}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Premiered:</span>
                  <span className="text-white font-semibold">
                    {animeInfo.Premiered}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-semibold">
                    {animeInfo.Duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MAL Score:</span>
                  <span className="text-white font-semibold">
                    {animeInfo["MAL Score"]}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">🎬</span>
                Production
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 block mb-2">Studio:</span>
                  <span className="text-white font-semibold">
                    {animeInfo.Studios}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-2">Producers:</span>
                  <div className="flex flex-wrap gap-2">
                    {animeInfo.Producers.map((producer, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
                      >
                        {producer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Anime */}
          {animeDetails.related_data.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="text-4xl mr-4">🔗</span>
                Related Anime
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {animeDetails.related_data.slice(0, 12).map((anime) => (
                  <Link key={anime.id} href={`/anime/${anime.id}`}>
                    <div className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-red-500">
                      <div className="relative aspect-[3/4]">
                        <img
                          src={anime.poster}
                          alt={anime.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                            <span className="text-lg">▶️</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                          {anime.title}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1">
                          {anime.tvInfo.showType} • {anime.tvInfo.sub} eps
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Recommended Anime */}
          {animeDetails.recommended_data.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="text-4xl mr-4">💫</span>
                Recommended For You
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {animeDetails.recommended_data.slice(0, 12).map((anime) => (
                  <Link key={anime.id} href={`/anime/${anime.id}`}>
                    <div className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500">
                      <div className="relative aspect-[3/4]">
                        <img
                          src={anime.poster}
                          alt={anime.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                            <span className="text-lg">▶️</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {anime.title}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1">
                          {anime.tvInfo.showType} • {anime.tvInfo.sub} eps
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || typeof id !== "string") {
    return {
      props: {
        animeDetails: null,
        error: "Invalid anime ID",
      },
    };
  }

  try {
    const response = await fetchAnimeDetails(id);

    if (!response.success || !response.results?.data) {
      return {
        props: {
          animeDetails: null,
          error: "Anime not found",
        },
      };
    }

    return {
      props: {
        animeDetails: response.results.data,
      },
    };
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return {
      props: {
        animeDetails: null,
        error: "Failed to load anime details",
      },
    };
  }
};
