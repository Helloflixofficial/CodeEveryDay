import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProxiedUrl } from "@/services/animeApi";
import type { StreamLink, Server } from "@/types/anime";

interface VideoPlayerProps {
  streamingData?: StreamLink;
  servers: Server[];
  currentServer: string;
  onServerChange: (serverId: string) => void;
  currentType: 'sub' | 'dub';
  onTypeChange: (type: 'sub' | 'dub') => void;
}

const VideoPlayer = ({ 
  streamingData, 
  servers, 
  currentServer, 
  onServerChange,
  currentType,
  onTypeChange 
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (streamingData && videoRef.current) {
      const video = videoRef.current;
      const videoUrl = getProxiedUrl(streamingData.link.file);
      setIsLoading(true);

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
        });

        // Add subtitle tracks
        streamingData.tracks?.forEach((track) => {
          const textTrack = video.addTextTrack(track.kind as any, track.label, track.label);
          fetch(track.file)
            .then(res => res.text())
            .then(content => {
              // Handle VTT content
            });
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => setIsLoading(false));
      }

      video.addEventListener('timeupdate', () => {
        setCurrentTime(video.currentTime);
        setProgress([(video.currentTime / video.duration) * 100]);
      });

      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration);
      });

      video.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, [streamingData]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(value);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const availableServers = servers.filter(s => s.type === currentType);
  const subServers = servers.filter(s => s.type === 'sub');
  const dubServers = servers.filter(s => s.type === 'dub');

  return (
    <div className="space-y-4">
      {/* Server and Type Selection */}
      <div className="flex flex-wrap items-center gap-4">
        {subServers.length > 0 && dubServers.length > 0 && (
          <Select value={currentType} onValueChange={(v) => onTypeChange(v as 'sub' | 'dub')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sub">Subbed</SelectItem>
              <SelectItem value="dub">Dubbed</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {availableServers.length > 1 && (
          <Select value={currentServer} onValueChange={onServerChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Server" />
            </SelectTrigger>
            <SelectContent>
              {availableServers.map((server) => (
                <SelectItem key={server.server_id} value={server.server_id.toString()}>
                  {server.server_name || server.serverName || `Server ${server.server_id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Video Player */}
      <div 
        className="relative aspect-video bg-black rounded-lg overflow-hidden group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {streamingData ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full"
              crossOrigin="anonymous"
              onClick={togglePlay}
            >
              <source src={streamingData.link.file} type={streamingData.link.type || 'application/x-mpegURL'} />
              {streamingData.tracks?.map((track, index) => (
                <track
                  key={index}
                  kind={track.kind as any}
                  label={track.label}
                  src={track.file}
                  default={track.default}
                />
              ))}
              Your browser does not support the video tag.
            </video>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              </div>
            )}

            {/* Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={progress}
                  max={100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="w-full cursor-pointer"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>

                  <div className="w-20">
                    <Slider
                      value={volume}
                      max={100}
                      step={1}
                      onValueChange={setVolume}
                      className="cursor-pointer"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <p className="text-white">Select an episode to start watching</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
