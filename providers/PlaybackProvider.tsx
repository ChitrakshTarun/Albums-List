"use client";
import React, { createContext, useContext, useState, ReactNode, useRef } from "react";
import { getAllAlbums } from "@/db/actions/albumsAction"; // Ensure correct path

interface Track {
  url: string | null;
  name: string | null;
}

interface PlaybackContextType {
  currentTrack: string | null;
  currentTrackName: string | null;
  trackList: Track[];
  currentIndex: number;
  setTrack: (url: string | null, name: string | null, index?: number) => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentTrackName, setCurrentTrackName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  // Fetch albums and set trackList
  React.useEffect(() => {
    getAllAlbums().then((albums) => {
      const tracks = albums
        .filter((album) => album.firstSongUrl && album.firstSong)
        .map((album) => ({
          url: album.firstSongUrl,
          name: album.firstSong,
        }));
      setTrackList(tracks);
    });
  }, []);

  const playTrack = (url: string | null, name: string | null, index?: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url || "";
      audioRef.current.load();
      if (url) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
    setCurrentTrack(url);
    setCurrentTrackName(name);

    index = trackList.findIndex((track) => track.url === url);
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (trackList.length === 0) return;
    const nextIndex = (currentIndex + 1) % trackList.length;
    playTrack(trackList[nextIndex].url, trackList[nextIndex].name, nextIndex);
  };

  const prevTrack = () => {
    if (trackList.length === 0 || !audioRef.current) return;
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0; // Restart current track
    } else {
      const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
      playTrack(trackList[prevIndex].url, trackList[prevIndex].name, prevIndex);
    }
  };

  return (
    <PlaybackContext.Provider
      value={{
        currentTrack,
        currentTrackName,
        trackList,
        currentIndex,
        setTrack: playTrack,
        isPlaying,
        togglePlayPause,
        nextTrack,
        prevTrack,
        audioRef,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }
  return context;
};
