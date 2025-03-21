/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown, ChevronUp, SkipBack, SkipForward } from "lucide-react";
import { usePlayback } from "@/providers/PlaybackProvider";

export default function PlaybackWidget() {
  const { currentTrack, currentTrackName, isPlaying, togglePlayPause, audioRef, nextTrack, prevTrack } = usePlayback();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [wasClosed, setWasClosed] = useState(true);

  useEffect(() => {
    if (currentTrack) {
      if (!isVisible) {
        setIsVisible(true);
        setIsExpanded(true);
        setWasClosed(true);
      }
    } else {
      setIsVisible(false);
      setIsExpanded(false);
      setWasClosed(true);
    }
  }, [currentTrack, isVisible]);

  useEffect(() => {
    if (isExpanded && wasClosed && audioRef.current) {
      audioRef.current.play();
      setWasClosed(false);
    }
  }, [isExpanded, wasClosed]);

  if (!isVisible || !currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{
          y: 0,
          height: isExpanded ? "60vh" : "auto",
        }}
        exit={{ y: "100%" }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`fixed bg-gray-800 shadow-xl text-white ${
          isExpanded ? "bottom-0 left-0 right-0 rounded-t-2xl" : "rounded-lg shadow-lg bottom-0 left-0 right-0"
        }`}
      >
        <div className={`flex ${isExpanded ? "flex-col items-center h-full" : "justify-between items-center"}`}>
          {isExpanded && (
            <>
              <button
                onClick={() => {
                  setIsExpanded(false);
                }}
                className="self-end"
              >
                <ChevronDown size={24} className="text-white" />
              </button>
              <h2 className="text-lg font-semibold text-white">Now Playing</h2>
              <p className="text-center text-white text-sm">{currentTrackName || "No track selected"}</p>
              <div className="flex gap-4">
                <button onClick={togglePlayPause} className="bg-gray-900 text-white p-2 rounded-full">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={prevTrack} className="text-white p-2">
                  <SkipBack size={24} />
                </button>
                <button onClick={nextTrack} className="text-white p-2">
                  <SkipForward size={24} />
                </button>
              </div>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 w-full bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex flex-1">
              <audio ref={audioRef} className="w-full" controls>
                <source src={currentTrack} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <button onClick={() => setIsExpanded(true)} className="text-white ml-2">
              <ChevronUp size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
