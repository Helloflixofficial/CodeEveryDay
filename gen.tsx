import { useState } from "react";
import { useParams } from "react-router-dom";
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

const genreAnimeMap: Record<string, any[]> = {
  action: [
    {
      id: "demon-slayer-action",
      title: "Demon Slayer",
      subtitle: "Intense sword fighting action",
      image: anime2,
      rating: 9.1,
      year: 2019,
      episodes: 44,
      type: "TV",
      status: "Completed",
      genres: ["Action", "Historical", "Supernatural"]
    },
    {
      id: "attack-on-titan-action",
      title: "Attack on Titan",
      subtitle: "Humanity's last stand",
      image: anime3,
      rating: 9.5,
      year: 2013,
      episodes: 91,
      type: "TV",
      status: "Completed",
      genres: ["Action", "Drama", "Fantasy"]
    },
    {
      id: "jujutsu-kaisen-action",
      title: "Jujutsu Kaisen",
      subtitle: "Supernatural action battles",
      image: anime4,
      rating: 9.0,
      year: 2020,
      episodes: 47,
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "School", "Supernatural"]
    }
  ],
  adventure: [
    {
      id: "one-piece-adventure",
      title: "One Piece",
      subtitle: "The greatest pirate adventure",
      image: anime1,
      rating: 9.2,
      year: 1999,
      episodes: 1000,
      type: "TV",
      status: "Ongoing",
      genres: ["Adventure", "Comedy", "Action"]
    }
  ],
  comedy: [
    {
      id: "one-piece-comedy",
      title: "One Piece",
      subtitle: "Hilarious pirate comedy",
      image: anime1,
      rating: 9.2,
      year: 1999,
      episodes: 1000,
      type: "TV",
      status: "Ongoing",
      genres: ["Adventure", "Comedy", "Action"]
    },
    {
      id: "naruto-comedy",
      title: "Naruto",
      subtitle: "Ninja comedy moments",
      image: anime5,
      rating: 8.8,
      year: 2002,
      episodes: 500,
      type: "TV",
      status: "Completed",
      genres: ["Action", "Comedy", "Martial Arts"]
    }
  ],
  supernatural: [
    {
      id: "demon-slayer-supernatural",
      title: "Demon Slayer",
      subtitle: "Demons and supernatural powers",
      image: anime2,
      rating: 9.1,
      year: 2019,
      episodes: 44,
      type: "TV",
      status: "Completed",
      genres: ["Action", "Supernatural", "Historical"]
    },
    {
      id: "jujutsu-kaisen-supernatural",
      title: "Jujutsu Kaisen",
      subtitle: "Cursed spirits and sorcery",
      image: anime4,
      rating: 9.0,
      year: 2020,
      episodes: 47,
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "Supernatural", "School"]
    },
    {
      id: "death-note-supernatural",
      title: "Death Note",
      subtitle: "Supernatural death powers",
      image: anime8,
      rating: 9.4,
      year: 2006,
      episodes: 37,
      type: "TV",
      status: "Completed",
      genres: ["Psychological", "Supernatural", "Thriller"]
    }
  ]
};

const GenrePage = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const genreKey = genreName?.toLowerCase().replace('-', ' ') || '';
  const animes = genreAnimeMap[genreName?.toLowerCase() || ''] || [];
  
  const filteredAnimes = animes.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatGenreName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {formatGenreName(genreName || '')} Anime
        </h1>
        <p className="text-muted-foreground">
          Discover the best {formatGenreName(genreName || '').toLowerCase()} anime series and movies
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${formatGenreName(genreName || '').toLowerCase()} anime...`}
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
          Showing {filteredAnimes.length} of {animes.length} results
        </p>
      </div>

      {/* Anime Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {filteredAnimes.map((anime) => (
          <AnimeCard
            key={anime.id}
            {...anime}
            className={viewMode === 'list' ? 'flex-row' : ''}
          />
        ))}
      </div>

      {filteredAnimes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {animes.length === 0 
              ? `No anime found for ${formatGenreName(genreName || '')} genre.`
              : "No anime found matching your search."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
