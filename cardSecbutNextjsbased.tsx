import Link from 'next/link'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import AnimeCard from './AnimeCard'

type AnimeBasic = {
  id: string
  poster: string
  title: string
  tvInfo?: { eps?: number; showType?: string; episodeInfo?: { sub: number; dub: number }; sub?: number; dub?: number; releaseDate?: string }
}

export default function AnimeSectionGrid({
  title,
  subtitle,
  icon: Icon,
  animeList,
  viewAllLink,
  loading = false,
  showRank = false,
  limit = 12,
}: {
  title: string
  subtitle?: string
  icon: LucideIcon
  animeList: AnimeBasic[]
  viewAllLink?: string
  loading?: boolean
  showRank?: boolean
  limit?: number
}) {
  if (loading) {
    return (
      <section className="py-4 md:py-8 lg:py-12">
        <div className="container px-3 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div className="h-10 w-48 bg-muted rounded" />
            {viewAllLink && <div className="h-10 w-32 bg-muted rounded" />}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="aspect-[2/3] w-full bg-muted rounded" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!animeList?.length) return null
  const displayList = animeList.slice(0, limit)

  return (
    <section className="py-4 md:py-8 lg:py-12">
      <div className="container px-3 md:px-4">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 backdrop-blur-sm">
              <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h2>
              {subtitle && <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">{subtitle}</p>}
            </div>
          </div>
          {viewAllLink && (
            <Link href={viewAllLink} className="hidden sm:flex h-8 md:h-10 text-sm items-center gap-1 px-3 rounded hover:bg-muted">
              View All
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
          {displayList.map((anime, index) => {
            const hasEpisodeInfo = anime.tvInfo?.episodeInfo
            const subCount = hasEpisodeInfo ? (anime.tvInfo!.episodeInfo!.sub) : (anime.tvInfo?.sub || 0)
            const dubCount = hasEpisodeInfo ? (anime.tvInfo!.episodeInfo!.dub) : (anime.tvInfo?.dub || 0)
            const totalEpisodes = anime.tvInfo?.eps || subCount + dubCount
            const yearMatch = anime.tvInfo?.releaseDate?.match(/(\d{4})/)
            const yearNumber = yearMatch ? parseInt(yearMatch[1]) : undefined
            return (
              <div key={anime.id} className="relative group">
                {showRank && (
                  <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 z-10 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs md:text-sm shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                )}
                <AnimeCard
                  id={anime.id}
                  title={anime.title}
                  image={anime.poster}
                  year={yearNumber}
                  episodes={totalEpisodes}
                  isDubbed={dubCount > 0}
                />
              </div>
            )
          })}
        </div>
        {viewAllLink && (
          <div className="flex justify-center mt-6 sm:hidden">
            <Link href={viewAllLink} className="w-full max-w-xs text-sm border rounded h-10 flex items-center justify-center">
              View All {title}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

