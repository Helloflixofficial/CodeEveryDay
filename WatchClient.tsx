'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import VideoPlayer from './VideoPlayer'

type Server = { type: string; data_id: number; server_id: number; server_name?: string; serverName?: string }
type StreamLink = { link: { file: string; type?: string }; tracks?: { file: string; label: string; kind: string; default?: boolean }[] }

export default function WatchClient({
  source,
  servers,
  currentServer,
  currentType,
  animeId,
  episodes,
  currentEpisodeId,
}: {
  source?: StreamLink
  servers: Server[]
  currentServer: string
  currentType: string
  animeId?: string
  episodes: { id: string; episode_no: number }[]
  currentEpisodeId: string
}) {
  const router = useRouter()
  const params = useSearchParams()

  const setQuery = (key: string, value: string) => {
    const q = new URLSearchParams(params.toString())
    q.set(key, value)
    router.replace(`?${q.toString()}`)
  }

  const types = Array.from(new Set(servers.map((s) => s.type))).filter(Boolean)
  const availableServers = servers.filter((s) => s.type === currentType)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {types.length > 1 && (
          <select
            className="h-9 rounded-md border bg-background px-3"
            value={currentType}
            onChange={(e) => setQuery('type', e.target.value)}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        )}
        {availableServers.length > 0 && (
          <select
            className="h-9 rounded-md border bg-background px-3"
            value={currentServer}
            onChange={(e) => setQuery('server', e.target.value)}
          >
            {availableServers.map((s) => {
              const name = s.server_name || s.serverName || `Server ${s.server_id}`
              const slug = name.toString().toLowerCase().replace(/\s+/g, '-')
              return (
                <option key={slug} value={slug}>
                  {name}
                </option>
              )
            })}
          </select>
        )}
      </div>

      <VideoPlayer source={source} />

      {animeId && episodes?.length ? (
        <div>
          <h2 className="text-lg font-semibold mb-3">Episodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {episodes.map((e) => (
              <Link
                key={e.id}
                href={`/anime/${animeId}/episode/${e.id}?server=${currentServer}&type=${currentType}`}
                className={`border rounded p-2 text-sm hover:bg-muted ${e.id === currentEpisodeId ? 'bg-muted' : ''}`}
              >
                Episode {e.episode_no}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

