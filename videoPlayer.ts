"use client";

import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import toast from "react-hot-toast";
import type { StreamingData } from "@/types/anime";

interface VideoPlayerProps {
  streamingData: StreamingData;
  title: string;
  episodeNumber?: number;
  nextEpisode?: () => void;
  prevEpisode?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  streamingData,
  title,
  episodeNumber,
  nextEpisode,
  prevEpisode,
}) => {
  const artRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Artplayer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artRef.current || !streamingData?.results?.streamingLink?.[0]) return;

    const streamData = streamingData.results.streamingLink[0];
    const videoUrl = streamData.link.file;

    // Initialize HLS
    if (Hls.isSupported()) {
      window.hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        enableWorker: true,
      });
    }

    // Create ArtPlayer instance
    const art = new Artplayer({
      container: artRef.current,
      url: videoUrl,
      type: streamData.link.type || "m3u8",
      title: `${title} - Episode ${episodeNumber || ""}`,
      poster: "",
      volume: 0.7,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#ff6b6b",
      lang: "en",
      whitelist: ["*"],
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },

      // Add quality plugin for HLS
      plugins: [
        artplayerPluginHlsQuality({
          control: false,
          setting: true,
          auto: "Auto",
          getResolution(level: any) {
            if (level.height === -1) return "Auto";
            return level.height > 720
              ? `${level.height}p (HD)`
              : `${level.height}p`;
          },
          title: "Quality",
        }),
      ],

      // Add subtitles if available
      subtitle: {
        url: streamData.tracks?.[0]?.file || "",
        type: "srt",
        encoding: "utf-8",
        escape: false,
      },

      // Custom controls
      controls: [
        {
          name: "prev-episode",
          position: "left",
          html: "⏮",
          tooltip: "Previous Episode",
          click: () => prevEpisode?.(),
          show: !!prevEpisode,
        },
        {
          name: "next-episode",
          position: "left",
          html: "⏭",
          tooltip: "Next Episode",
          click: () => nextEpisode?.(),
          show: !!nextEpisode,
        },
      ],

      // Custom context menu
      contextmenu: [
        {
          name: "Copy URL",
          click: () => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("URL copied to clipboard");
          },
        },
      ],

      // Custom settings
      settings: [
        {
          name: "playback-speed",
          html: "Playback Speed",
          selector: [
            { name: "0.5x", value: 0.5 },
            { name: "0.75x", value: 0.75 },
            { name: "1x", value: 1, default: true },
            { name: "1.25x", value: 1.25 },
            { name: "1.5x", value: 1.5 },
            { name: "2x", value: 2 },
          ],
          onSelect: (item: any) => {
            art.playbackRate = item.value;
            return item.name;
          },
        },
      ],
    });

    // Event listeners
    art.on("ready", () => {
      setLoading(false);
      toast.success("Video loaded successfully");
    });

    art.on("error", (error: any) => {
      console.error("Player error:", error);
      toast.error("Failed to load video");
      setLoading(false);
    });

    art.on("video:ended", () => {
      if (nextEpisode) {
        toast("Episode ended. Playing next episode...", {
          duration: 3000,
          icon: "▶️",
        });
        setTimeout(nextEpisode, 3000);
      }
    });

    // Save current time periodically
    art.on("video:timeupdate", () => {
      const currentTime = art.currentTime;
      const duration = art.duration;

      if (currentTime > 0 && duration > 0) {
        localStorage.setItem(
          `episode-${episodeNumber}-time`,
          currentTime.toString()
        );
      }
    });

    // Load saved time
    const savedTime = localStorage.getItem(`episode-${episodeNumber}-time`);
    if (savedTime && parseFloat(savedTime) > 0) {
      art.on("canplay", () => {
        art.currentTime = parseFloat(savedTime);
      });
    }

    playerRef.current = art;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(false);
        playerRef.current = null;
      }
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, [streamingData, title, episodeNumber, nextEpisode, prevEpisode]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}
      <div
        ref={artRef}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
};
