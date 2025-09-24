import { Link } from "react-router-dom";
import { Play, Star, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  episodes?: number;
  type?: string;
  status?: string;
  genres?: string[];
  subtitle?: string;
  className?: string;
}

const AnimeCard = ({ 
  id, 
  title, 
  image, 
  rating, 
  year, 
  episodes, 
  type, 
  status, 
  genres = [],
  subtitle,
  className = "" 
}: AnimeCardProps) => {
  return (
    <div className={`group relative anime-card overflow-hidden ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              size="sm"
              className="w-full mb-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link to={`/watch/${id}`}>
                <Play className="h-4 w-4 mr-2" />
                Watch Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        {status && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-secondary/90 backdrop-blur-sm"
          >
            {status}
          </Badge>
        )}

        {/* Rating */}
        {rating && (
          <div className="absolute top-2 left-2 flex items-center space-x-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Link to={`/anime/${id}`} className="block">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {subtitle && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {subtitle}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            {year && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{year}</span>
              </div>
            )}
            {episodes && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{episodes} eps</span>
              </div>
            )}
          </div>
          {type && (
            <Badge variant="outline" className="text-xs px-1 py-0">
              {type}
            </Badge>
          )}
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {genres.slice(0, 2).map((genre, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-0 bg-accent/50"
              >
                {genre}
              </Badge>
            ))}
            {genres.length > 2 && (
              <Badge variant="secondary" className="text-xs px-2 py-0 bg-muted">
                +{genres.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;
