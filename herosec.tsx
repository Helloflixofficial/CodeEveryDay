import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info, Star, Calendar, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/anime-hero.jpg";

interface HeroAnime {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  year: number;
  episodes: number;
  genres: string[];
  status: string;
}

const heroAnimes: HeroAnime[] = [
  {
    id: "1",
    title: "My Dress-Up Darling Season 2",
    description: "The second season of Sono Bisque Doll wa Koi wo Suru. When Marin Kitagawa and Wakana Gojo met, they grew close over their love for cosplay. Through interacting with classmates and making new cosplay friends, Marin and Wakana's world keeps growing. New developments arise as Marin's love for Wakana grows.",
    image: heroImage,
    rating: 8.5,
    year: 2025,
    episodes: 24,
    genres: ["Romance", "Comedy", "School", "Slice of Life"],
    status: "Ongoing"
  },
  {
    id: "2", 
    title: "Jujutsu Kaisen Season 3",
    description: "The highly anticipated third season continues the adventures of Yuji Itadori and his fellow sorcerers as they face even more powerful curses and uncover dark secrets about the jujutsu world.",
    image: heroImage,
    rating: 9.2,
    year: 2025,
    episodes: 24,
    genres: ["Action", "Supernatural", "School", "Drama"],
    status: "Coming Soon"
  },
  {
    id: "3",
    title: "Demon Slayer: Infinity Castle Arc",
    description: "Tanjiro and his companions enter the final battle against Muzan and the Upper Moons in this climactic arc of the beloved demon-slaying saga.",
    image: heroImage,
    rating: 9.5,
    year: 2025,
    episodes: 12,
    genres: ["Action", "Historical", "Supernatural", "Drama"],
    status: "Coming Soon"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentAnime = heroAnimes[currentSlide];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroAnimes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroAnimes.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroAnimes.length) % heroAnimes.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentAnime.image}
          alt={currentAnime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-7xl px-4 py-20 mx-auto">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          {/* Spotlight Badge */}
          <div className="flex items-center space-x-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 animate-glow-pulse">
              <Zap className="h-3 w-3 mr-1" />
              #{currentSlide + 1} Spotlight
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-glow">
            {currentAnime.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{currentAnime.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{currentAnime.year}</span>
            </div>
            <Badge variant="outline" className="bg-card/50 backdrop-blur-sm">
              {currentAnime.episodes} episodes
            </Badge>
            <Badge 
              variant="secondary" 
              className={`${
                currentAnime.status === 'Ongoing' 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}
            >
              {currentAnime.status}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {currentAnime.description}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {currentAnime.genres.map((genre, index) => (
              <Link
                key={index}
                to={`/genre/${genre.toLowerCase().replace(' ', '-')}`}
                className="px-3 py-1 text-xs rounded-full bg-accent/50 hover:bg-accent transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold animate-glow-pulse"
              asChild
            >
              <Link to={`/watch/${currentAnime.id}`}>
                <Play className="h-5 w-5 mr-2" />
                Watch Now
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70"
              asChild
            >
              <Link to={`/anime/${currentAnime.id}`}>
                <Info className="h-5 w-5 mr-2" />
                Details
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 backdrop-blur-sm hover:bg-background/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroAnimes.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-primary scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
