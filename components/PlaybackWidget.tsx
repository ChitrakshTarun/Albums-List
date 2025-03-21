"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
import { usePlayback } from "@/providers/PlaybackProvider";

export default function PlaybackWidget() {
  const { currentTrack, currentTrackName, setTrack, isPlaying, togglePlayPause, audioRef } = usePlayback();
  const [isOpen, setIsOpen] = useState(false);
  const [wasMinimized, setWasMinimized] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      if (!isOpen && !wasMinimized) {
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }, [currentTrack, isOpen, wasMinimized]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed bottom-0 left-0 right-0 h-[60vh] bg-gray-900 shadow-xl rounded-t-2xl p-4"
          >
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setWasMinimized(true);
                }}
                className="self-end"
              >
                <ChevronDown size={24} />
              </button>
              <h2 className="text-lg font-semibold">Now Playing</h2>
              <p className="text-center text-black text-sm">{currentTrackName || "No track selected"}</p>
              <div className="flex gap-4 mt-2">
                <button onClick={togglePlayPause} className="bg-gray-900 text-white p-2 rounded-full">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={() => setTrack(null, null)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Stop
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentTrack && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white flex justify-between items-center px-4 py-2 rounded-lg shadow-lg"
        >
          <audio ref={audioRef} controls autoPlay className="w-full">
            <source src={currentTrack} type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={() => setIsOpen(true)} className="text-white">
            <ChevronUp size={24} />
          </button>
          <button onClick={togglePlayPause} className="bg-white text-gray-900 p-2 rounded-full">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </motion.div>
      )}
    </>
  );
}
