import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const WatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [quality, setQuality] = useState("1080p");
  const [subtitle, setSubtitle] = useState("English");

  // Mock data
  const anime = {
    id: id || "1",
    title: "My Dress-Up Darling Season 2",
    currentEpisode: currentEpisode,
    totalEpisodes: 24,
    episodeTitle: "The Cosplay That Started Everything"
  };

  const episodes = Array.from({ length: anime.totalEpisodes }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background">
    <div className="container px-4 py-4">
      <Button variant="ghost" asChild>
        <Link to={`/anime/${id}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Link>
      </Button>
    </div>

      {/* Video Player */}
      <div className="container px-4">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
          {/* Placeholder Video Area */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <p className="text-white">Video Player Placeholder</p>
              <p className="text-gray-400 text-sm">In a real app, this would be your video player</p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                defaultValue={[25]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <div className="w-20">
                  <Slider
                    defaultValue={[70]}
                    max={100}
                    step={1}
                  />
                </div>

                <span className="text-white text-sm">15:42 / 24:30</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode Info and Controls */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Episode Title */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Episode {anime.currentEpisode}</Badge>
                <Badge variant="outline">{quality}</Badge>
                <Badge variant="outline">{subtitle} Sub</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {anime.title}
              </h1>
              <h2 className="text-lg text-muted-foreground">
                {anime.episodeTitle}
              </h2>
            </div>

            {/* Player Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p HD</SelectItem>
                  <SelectItem value="720p">720p HD</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="360p">360p</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subtitle} onValueChange={setSubtitle}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Episode Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                disabled={currentEpisode === 1}
                onClick={() => setCurrentEpisode(Math.max(1, currentEpisode - 1))}
              >
                <SkipBack className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                disabled={currentEpisode === anime.totalEpisodes}
                onClick={() => setCurrentEpisode(Math.min(anime.totalEpisodes, currentEpisode + 1))}
              >
                Next
                <SkipForward className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Episodes List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Episodes</h3>
            <div className="anime-card p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {episodes.map((episodeNum) => (
                  <button
                    key={episodeNum}
                    onClick={() => setCurrentEpisode(episodeNum)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      episodeNum === currentEpisode
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Episode {episodeNum}</span>
                      <span className="text-sm text-muted-foreground">24:30</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
