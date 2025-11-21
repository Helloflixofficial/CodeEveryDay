import Link from "next/link";
import { redirect } from "next/navigation";
import { getEpisodes, getStream } from "@/lib/anime";
import VideoPlayer from "@/components/VideoPlayer";

export const revalidate = 60;

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    server?: string;
    type?: string;
    animeId?: string;
    ep?: string;
  };
}) {
  const server = searchParams.server || "hd-1";
  const type = searchParams.type || "sub";

  // Some clients send malformed querystrings like `?ep=2142?animeId=one-piece-100`.
  // Normalize and recover possible extra params embedded inside values.
  const normalizeSearch = (raw: { [k: string]: any }) => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw || {})) {
      if (v == null) continue;
      const s = String(v);
      // If the value contains another key=value (e.g. "2142?animeId=one-piece-100"),
      // try to parse it and merge.
      if (/[=?&].+\=/.test(s)) {
        // Replace leading ? if present and split on &
        const tail = s.replace(/^\?/, "");
        const parts = tail.split(/[&]/);
        // First part is likely the real value for this key (unless it contains =)
        const first = parts.shift() || "";
        if (first.includes("=")) {
          // unexpected, parse all
          const p = new URLSearchParams(tail);
          for (const [kk, vv] of p.entries()) out[kk] = vv;
        } else {
          out[k] = first;
          const p = new URLSearchParams(parts.join("&"));
          for (const [kk, vv] of p.entries()) out[kk] = vv;
        }
      } else {
        out[k] = s;
      }
    }
    return out;
  };

  const qs = normalizeSearch(searchParams as any);

  // Episode id preference: explicit `ep` query param (if present) wins,
  // otherwise use the path param `params.id`.
  const episodeId = qs.ep && qs.ep !== "" ? qs.ep : params.id;
  const animeId = qs.animeId || qs.animeid || searchParams.animeId;

  // 1. Fetch stream
  const streaming = await getStream(episodeId, server, type);
  const streamingData = streaming?.results ?? streaming ?? null;
  let source = streamingData?.streamingLink?.[0];

  // 2. If stream missing → fallback to first episode
  if (!source) {
    // If we couldn't fetch a stream for `episodeId`, attempt fallback:
    // If we treated params.id as an episode id but it's actually an anime slug,
    // try fetching episodes for that slug only if it looks like a slug (non-numeric)
    // or if `animeId` was provided try fetching episodes for it instead.
    const fallbackAnimeId = animeId || params.id;
    const series = await getEpisodes(fallbackAnimeId);
    if (series?.episodes?.length) {
      const first = series.episodes[0];
      redirect(`/watch/${first.id}?animeId=${fallbackAnimeId}`);
    }
  }

  // 3. If animeId exists → fetch all episodes of that anime
  const eps = animeId ? await getEpisodes(animeId) : null;

  return (
    <div className="container px-3 md:px-4 py-6 space-y-6">
      {/* PLAYER */}
      {streamingData?.error ? (
        <div className="text-red-400">
          API Error: {String(streamingData.error)}
          {streamingData._requested ? (
            <div className="text-sm text-muted-foreground">
              Requested: {streamingData._requested}
            </div>
          ) : null}
        </div>
      ) : source ? (
        <>
          <VideoPlayer source={source} />
          {streamingData?._requested ? (
            <div className="mt-3 text-sm text-muted-foreground">
              Requested: {streamingData._requested}
            </div>
          ) : null}
          <details className="mt-2">
            <summary className="cursor-pointer text-sm">
              Show stream response (debug)
            </summary>
            <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-slate-900 text-white rounded">
              {JSON.stringify(streamingData, null, 2)}
            </pre>
          </details>
        </>
      ) : (
        <>
          <div className="text-muted-foreground">
            No stream available for this item.
          </div>
          {streamingData?._requested ? (
            <div className="mt-3 text-sm text-muted-foreground">
              Requested: {streamingData._requested}
            </div>
          ) : null}
          <details className="mt-2">
            <summary className="cursor-pointer text-sm">
              Show stream response (debug)
            </summary>
            <pre className="whitespace-pre-wrap text-xs mt-2 p-2 bg-slate-900 text-white rounded">
              {JSON.stringify(streamingData, null, 2)}
            </pre>
          </details>
        </>
      )}

      {/* EPISODE LIST */}
      {animeId && eps?.episodes?.length ? (
        <div>
          <h2 className="text-lg font-semibold mb-3">Episodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {eps.episodes.map((e: any) => (
              <Link
                key={e.id}
                href={`/watch/${e.id}?animeId=${animeId}`}
                className="border rounded p-2 hover:bg-muted text-sm"
              >
                Episode {e.episode_no}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
