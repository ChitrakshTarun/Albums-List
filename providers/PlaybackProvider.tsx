"use client";
import React, { createContext, useContext, useState, ReactNode, useRef } from "react";

interface PlaybackContextType {
  currentTrack: string | null;
  currentTrackName: string | null;
  setTrack: (url: string | null, name: string | null) => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentTrackName, setCurrentTrackName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (url: string | null, name: string | null) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop previous track
      audioRef.current.src = url || ""; // Reset the src to force reload
      audioRef.current.load(); // Load new track
      if (url) {
        audioRef.current.play(); // Start playback
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
    setCurrentTrack(url);
    setCurrentTrackName(name);
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

  return (
    <PlaybackContext.Provider
      value={{ currentTrack, currentTrackName, setTrack: playTrack, isPlaying, togglePlayPause, audioRef }}
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
