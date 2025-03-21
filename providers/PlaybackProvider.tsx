"use client";
import React, { createContext, useContext, useState, ReactNode, useRef } from "react";

interface PlaybackContextType {
  currentTrack: string | null;
  setTrack: (url: string | null) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (url: string | null) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
    setCurrentTrack(url);
  };

  return (
    <PlaybackContext.Provider value={{ currentTrack, setTrack: playTrack }}>
      <div className="fixed top-0 left-0 w-full bg-black text-white p-4 z-50 flex items-center justify-between">
        {currentTrack ? (
          <audio ref={audioRef} controls autoPlay className="w-full">
            <source src={currentTrack} type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className="text-center">Select a track to play</p>
        )}
        {currentTrack && (
          <button onClick={() => playTrack(null)} className="ml-4 px-4 py-2 bg-red-500 rounded-lg">
            Stop
          </button>
        )}
      </div>
      <div className="mt-20">{children}</div>
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
