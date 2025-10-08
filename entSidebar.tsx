import { Clock, TrendingUp, Star, Play, X } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useState } from "react";

const trendingAnime = [
  { id: 1, title: "Demon Slayer S4", episode: "EP 12", rating: 9.2, status: "Airing" },
  { id: 2, title: "Jujutsu Kaisen", episode: "EP 24", rating: 9.0, status: "Completed" },
  { id: 3, title: "Attack on Titan", episode: "EP 87", rating: 9.5, status: "Completed" },
  { id: 4, title: "One Piece", episode: "EP 1095", rating: 8.9, status: "Airing" },
  { id: 5, title: "My Hero Academia", episode: "EP 138", rating: 8.7, status: "Airing" },
];

const recentUpdates = [
  { title: "Frieren: Beyond Journey's End", time: "2 mins ago" },
  { title: "Solo Leveling", time: "15 mins ago" },
  { title: "Mushoku Tensei", time: "1 hour ago" },
  { title: "Blue Lock S2", time: "3 hours ago" },
];

export function EntertainmentSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-card/80 backdrop-blur-sm border border-border/40 rounded-l-lg rounded-r-none h-20 w-8"
        onClick={() => setIsOpen(true)}
      >
        <TrendingUp className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <aside className="hidden lg:block w-64 border-l border-border/40 bg-card/30 backdrop-blur-sm relative">
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 z-10 h-8 w-8 p-0 hover:bg-destructive/10"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <ScrollArea className="h-screen pb-20">
        <div className="p-4 space-y-5 pt-12">
          {/* Trending Now */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-bold text-base">Trending Now</h3>
            </div>
            <div className="space-y-2">
              {trendingAnime.map((anime) => (
                <Card
                  key={anime.id}
                  className="p-2.5 bg-gradient-to-br from-card/60 to-card/40 hover:from-card/80 hover:to-card/60 transition-all cursor-pointer border-border/40 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs truncate text-foreground">
                        {anime.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                          {anime.episode}
                        </Badge>
                        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                          <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                          {anime.rating}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={anime.status === "Airing" ? "default" : "outline"}
                      className="text-[10px] shrink-0 h-4 px-1.5"
                    >
                      {anime.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-bold text-base">Recent Updates</h3>
            </div>
            <div className="space-y-1.5">
              {recentUpdates.map((item, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg bg-muted/20 hover:bg-primary/10 transition-all cursor-pointer border border-border/20 hover:border-primary/30"
                >
                  <div className="flex items-start gap-2">
                    <Play className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <Card className="p-3 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-lg shadow-primary/5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Anime</span>
                <span className="font-bold text-primary text-sm">12,540+</span>
              </div>
              <div className="h-px bg-border/30" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Episodes</span>
                <span className="font-bold text-primary text-sm">185,320+</span>
              </div>
              <div className="h-px bg-border/30" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Active Users</span>
                <span className="font-bold text-primary text-sm">2.5M+</span>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </aside>
  );
}
