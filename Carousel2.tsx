import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeCard } from "./AnimeCard";
import { Button } from "@/components/ui/Button";
import type { AnimeInfo } from "@/types/anime";

interface AnimeCarouselProps {
  title: string;
  anime: AnimeInfo[];
  showViewAll?: boolean;
  viewAllHref?: string;
}

export const AnimeCarousel: React.FC<AnimeCarouselProps> = ({
  title,
  anime,
  showViewAll = false,
  viewAllHref = "#",
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 320; // Width of one card plus gap
    const newScrollLeft =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Update buttons after scroll animation
    setTimeout(updateScrollButtons, 300);
  };

  if (!anime?.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>

        <div className="flex items-center space-x-3">
          {/* Scroll buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 border-gray-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 border-gray-600"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* View All button */}
          {showViewAll && (
            <Link href={viewAllHref}>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-500 hover:text-primary-400"
              >
                View All
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={updateScrollButtons}
        >
          {anime.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-48 md:w-56"
            >
              <AnimeCard anime={item} />
            </div>
          ))}
        </div>

        {/* Gradient overlays for scroll indication */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-dark-900 to-transparent pointer-events-none z-10" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-dark-900 to-transparent pointer-events-none z-10" />
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
