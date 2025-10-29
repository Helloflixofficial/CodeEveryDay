"use client";

import { use } from "react";
import Link from "next/link";
import {
  Play,
  Star,
  Calendar,
  Clock,
  BookOpen,
  Users,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import anime1 from "@/assets/anime1.jpg";

export default function AnimeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Mock anime data - in real app this would come from API
  const anime = {
    id: id || "1",
    title: "My Dress-Up Darling Season 2",
    originalTitle: "Sono Bisque Doll wa Koi wo Suru Season 2",
    image: anime1,
    rating: 8.5,
    year: 2025,
    episodes: 24,
    duration: "24 min per ep",
    status: "Ongoing",
    studio: "Studio Trigger",
    source: "Manga",
    genres: ["Romance", "Comedy", "School", "Slice of Life"],
    description:
      "The second season of Sono Bisque Doll wa Koi wo Suru. When Marin Kitagawa and Wakana Gojo met, they grew close over their love for cosplay. Through interacting with classmates and making new cosplay friends, Marin and Wakana's world keeps growing. New developments arise as Marin's love for Wakana grows stronger, leading to heartwarming and comedic situations as they navigate their relationship while pursuing their passion for cosplay.",
    views: "2.5M",
    favorites: "150K",
    completed: "89K",
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {anime.status}
                </Badge>
                <Badge variant="outline">{anime.year}</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-glow">
                {anime.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {anime.originalTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href={`/watch/${anime.id}`}>
                  <Play className="h-5 w-5 mr-2" />
                  Watch Now
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Add to List
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">
                {anime.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre, index) => (
                  <Link
                    key={index}
                    href={`/genre/${genre.toLowerCase().replace(" ", "-")}`}
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-accent/50 text-accent-foreground hover:bg-accent transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="anime-card p-6 space-y-4">
              <h3 className="text-lg font-semibold">Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{anime.rating}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Episodes</span>
                  <span className="font-medium">{anime.episodes}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{anime.duration}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Studio</span>
                  <span className="font-medium">{anime.studio}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-medium">{anime.source}</span>
                </div>
              </div>
            </div>

            <div className="anime-card p-6 space-y-4">
              <h3 className="text-lg font-semibold">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Views</span>
                  </div>
                  <span className="font-medium">{anime.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Favorites</span>
                  </div>
                  <span className="font-medium">{anime.favorites}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Completed</span>
                  </div>
                  <span className="font-medium">{anime.completed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
