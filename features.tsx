"use client"

import { Play, Plus, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredContent = [
  {
    id: 1,
    title: "Attack on Titan: Final Season",
    description: "The final battle for humanity's survival begins as Eren's true intentions are revealed.",
    duration: "24 min",
    rating: 9.9,
    year: 2023,
    genre: "Action",
    image: "/attack-on-titan-final-season-poster.jpg",
    isNew: true,
  },
  {
    id: 2,
    title: "Demon Slayer: Hashira Training",
    description: "Tanjiro and his friends undergo intense training with the Hashira to prepare for the final battle.",
    duration: "23 min",
    rating: 9.5,
    year: 2024,
    genre: "Action",
    image: "/demon-slayer-hashira-training-poster.jpg",
    isNew: true,
  },
  {
    id: 3,
    title: "Jujutsu Kaisen Season 2",
    description: "The Shibuya Incident arc brings unprecedented chaos to the world of jujutsu sorcerers.",
    duration: "24 min",
    rating: 9.3,
    year: 2023,
    genre: "Supernatural",
    image: "/jujutsu-kaisen-season-2-poster.jpg",
    isNew: false,
  },
]

export function FeaturedSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">Featured This Week</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContent.map((content) => (
            <Card
              key={content.id}
              className="group cursor-pointer bg-card hover:bg-card/80 transition-all duration-300 border-0 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* New Badge */}
                  {content.isNew && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-accent text-accent-foreground">New</Badge>
                    </div>
                  )}

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" className="bg-primary hover:bg-primary/90 h-12 w-12">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs bg-background/20 border-white/20 text-white">
                        {content.genre}
                      </Badge>
                      <div className="flex items-center space-x-1 text-white">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{content.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{content.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{content.description}</p>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Watch
                    </Button>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
