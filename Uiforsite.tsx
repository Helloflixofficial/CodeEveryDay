import { TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimeCard from "./AnimeCard";

// Import anime images
import anime1 from "@/assets/anime1.jpg";
import anime2 from "@/assets/anime2.jpg";
import anime3 from "@/assets/anime3.jpg";
import anime4 from "@/assets/anime4.jpg";
import anime5 from "@/assets/anime5.jpg";
import anime6 from "@/assets/anime6.jpg";
import anime7 from "@/assets/anime7.jpg";
import anime8 from "@/assets/anime8.jpg";

const trendingAnimes = [
  {
    id: "one-piece",
    title: "One Piece",
    subtitle: "The Great Pirate Era continues...",
    image: anime1,
    rating: 9.2,
    year: 2023,
    episodes: 1000,
    type: "TV",
    status: "Ongoing",
    genres: ["Adventure", "Comedy", "Action", "Shounen"]
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    subtitle: "The Fragrant Flow of Wisteria Flowers",
    image: anime2,
    rating: 9.1,
    year: 2023,
    episodes: 44,
    type: "TV",
    status: "Completed",
    genres: ["Action", "Historical", "Supernatural", "Drama"]
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan Final Season",
    subtitle: "The Final Season",
    image: anime3,
    rating: 9.5,
    year: 2023,
    episodes: 28,
    type: "TV",
    status: "Completed",
    genres: ["Action", "Drama", "Fantasy", "Military"]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen Season 2",
    subtitle: "Shibuya Incident Arc",
    image: anime4,
    rating: 9.0,
    year: 2023,
    episodes: 23,
    type: "TV",
    status: "Completed",
    genres: ["Action", "School", "Supernatural", "Drama"]
  },
  {
    id: "naruto-shippuden",
    title: "Naruto: Shippuden",
    subtitle: "The Will of Fire Burns On",
    image: anime5,
    rating: 8.8,
    year: 2023,
    episodes: 500,
    type: "TV",
    status: "Completed",
    genres: ["Action", "Martial Arts", "Comedy", "Shounen"]
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia Season 7",
    subtitle: "Plus Ultra!",
    image: anime6,
    rating: 8.9,
    year: 2024,
    episodes: 25,
    type: "TV",
    status: "Ongoing",
    genres: ["Action", "School", "Superhero", "Comedy"]
  },
];

const TrendingSection = () => {
  return (
    <section className="py-6 md:py-12 bg-card/20">
      <div className="container px-3 md:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Trending Now</h2>
              <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">Most watched anime this week</p>
            </div>
          </div>
          
          <Button variant="ghost" className="hidden sm:flex h-8 md:h-10 text-sm" asChild>
            <Link to="/most-popular">
              View All
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Trending Grid - Responsive: 2 mobile, 4 tablet, 6 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {trendingAnimes.map((anime, index) => (
            <div key={anime.id} className="relative group">
              {/* Rank Number */}
              <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 z-10 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs md:text-sm shadow-lg">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <AnimeCard
                {...anime}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-6 sm:hidden">
          <Button variant="outline" className="w-full max-w-xs text-sm" asChild>
            <Link to="/most-popular">
              View All Trending
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
