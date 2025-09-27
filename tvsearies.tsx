import { useState } from "react";
import { Search, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimeCard from "@/components/AnimeCard";

// Import anime images
import anime1 from "@/assets/anime1.jpg";
import anime2 from "@/assets/anime2.jpg";
import anime3 from "@/assets/anime3.jpg";
import anime4 from "@/assets/anime4.jpg";
import anime5 from "@/assets/anime5.jpg";
import anime6 from "@/assets/anime6.jpg";
import anime7 from "@/assets/anime7.jpg";
import anime8 from "@/assets/anime8.jpg";

const tvSeries = [
  {
    id: "one-piece-tv",
    title: "One Piece",
    subtitle: "The ultimate pirate adventure",
    image: anime1,
    rating: 9.2,
    year: 1999,
    episodes: 1000,
    type: "TV",
    status: "Ongoing",
    genres: ["Adventure", "Comedy", "Action", "Shounen"]
  },
  {
    id: "demon-slayer-tv",
    title: "Demon Slayer",
    subtitle: "Kimetsu no Yaiba TV Series",
    image: anime2,
    rating: 9.1,
    year: 2019,
    episodes: 44,
    type: "TV",
    status: "Ongoing",
    genres: ["Action", "Historical", "Supernatural"]
  },
  {
    id: "attack-on-titan-tv",
    title: "Attack on Titan",
    subtitle: "Complete TV Series",
    image: anime3,
    rating: 9.5,
    year: 2013,
    episodes: 91,
    type: "TV",
    status: "Completed",
    genres: ["Action", "Drama", "Fantasy"]
  },
  {
    id: "jujutsu-kaisen-tv",
    title: "Jujutsu Kaisen",
    subtitle: "Sorcery Fight TV Series",
    image: anime4,
    rating: 9.0,
    year: 2020,
    episodes: 47,
    type: "TV",
    status: "Ongoing",
    genres: ["Action", "School", "Supernatural"]
  },
  {
    id: "naruto-tv",
    title: "Naruto Shippuden",
    subtitle: "Complete TV Series",
    image: anime5,
    rating: 8.8,
    year: 2007,
    episodes: 500,
    type: "TV",
    status: "Completed",
    genres: ["Action", "Martial Arts", "Comedy"]
  },
  {
    id: "my-hero-academia-tv",
    title: "My Hero Academia",
    subtitle: "Superhero Academia Series",
    image: anime6,
    rating: 8.9,
    year: 2016,
    episodes: 158,
    type: "TV",
    status: "Ongoing",
    genres: ["Action", "School", "Superhero"]
  },
  {
    id: "dragon-ball-z-tv",
    title: "Dragon Ball Z",
    subtitle: "Classic Battle Series",
    image: anime7,
    rating: 9.3,
    year: 1989,
    episodes: 291,
    type: "TV",
    status: "Completed",
    genres: ["Action", "Adventure", "Martial Arts"]
  },
  {
    id: "death-note-tv",
    title: "Death Note",
    subtitle: "Psychological Thriller Series",
    image: anime8,
    rating: 9.4,
    year: 2006,
    episodes: 37,
    type: "TV",
    status: "Completed",
    genres: ["Psychological", "Thriller", "Supernatural"]
  }
];

const TVSeries = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredSeries = tvSeries.filter(series =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">TV Series</h1>
        <p className="text-muted-foreground">
          Binge-watch the best anime TV series of all time
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search TV series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredSeries.length} of {tvSeries.length} results
        </p>
      </div>

      {/* Series Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {filteredSeries.map((series) => (
          <AnimeCard
            key={series.id}
            {...series}
            className={viewMode === 'list' ? 'flex-row' : ''}
          />
        ))}
      </div>

      {filteredSeries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No series found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default TVSeries;
