"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function AnimeCard({
  id,
  title,
  poster,
  className,
}: {
  id: string
  title: string
  poster?: string
  className?: string
}) {
  return (
    <Link
      href={`/anime/${encodeURIComponent(id)}`}
      className={cn(
        "group rounded-lg overflow-hidden bg-card text-card-foreground border hover:shadow-md transition",
        className,
      )}
    >
      <div className="aspect-[2/3] bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster || "/placeholder.svg?height=480&width=320&query=Anime%20poster"}
          alt={title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 text-pretty">{title}</h3>
      </div>
    </Link>
  )
}
