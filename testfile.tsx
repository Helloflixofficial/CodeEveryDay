import { getHomeData } from "@/lib/api";

export default async function TestPage() {
  let data;
  let error;

  try {
    data = await getHomeData();
  } catch (e: any) {
    error = e.message;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-6">🧪 API Debug Page</h1>

        {error && (
          <div className="bg-red-900 p-4 rounded mb-6">
            <p className="font-bold">❌ Error:</p>
            <p>{error}</p>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Spotlights */}
            {data.spotlights && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                  Spotlights ({data.spotlights.length})
                </h2>
                {data.spotlights.slice(0, 2).map((anime: any) => (
                  <div
                    key={anime.id}
                    className="mb-6 pb-6 border-b border-gray-700"
                  >
                    <div className="flex gap-4">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-32 h-48 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-blue-400">
                          {anime.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {anime.japanese_title}
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>ID: {anime.id}</p>
                          <p>Type: {anime.tvInfo?.showType}</p>
                          <p>Sub: {anime.tvInfo?.sub || "N/A"}</p>
                          <p>Dub: {anime.tvInfo?.dub || "N/A"}</p>
                          <p>Episodes: {anime.tvInfo?.eps || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <details className="mt-4">
                      <summary className="cursor-pointer text-yellow-400">
                        Show Raw JSON
                      </summary>
                      <pre className="bg-black p-4 rounded mt-2 text-xs overflow-auto">
                        {JSON.stringify(anime, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            )}

            {/* Trending */}
            {data.trending && data.trending.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                  Trending ({data.trending.length})
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {data.trending.slice(0, 8).map((anime: any) => (
                    <div key={anime.id} className="text-center">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <p className="text-xs truncate">{anime.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw Data */}
            <details className="bg-gray-800 p-6 rounded-lg">
              <summary className="cursor-pointer text-2xl font-bold text-yellow-400">
                🔍 Show Complete Raw API Response
              </summary>
              <pre className="bg-black p-4 rounded mt-4 text-xs overflow-auto max-h-96">
                {JSON.stringify(data, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </main>
  );
}
