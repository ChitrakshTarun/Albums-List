/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown, ChevronUp, SkipBack, SkipForward, X } from "lucide-react";
import { usePlayback } from "@/providers/PlaybackProvider";
import Image from "next/image";

export default function PlaybackWidget() {
  const {
    currentTrack,
    currentTrackName,
    currentAlbumCover,
    currentAlbumName,
    isPlaying,
    togglePlayPause,
    audioRef,
    nextTrack,
    prevTrack,
  } = usePlayback();

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
      setWasClosed(true);
    }
  }, [currentTrack]);

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
        animate={{ y: 0, height: isExpanded ? "60vh" : "auto" }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.2, ease: isExpanded ? "easeInOut" : "easeIn" }}
        className={`fixed bg-[#1c1c1c] shadow-xl text-white bottom-0 left-0 right-0 ${
          isExpanded ? "rounded-t-2xl" : "rounded-lg shadow-lg p-2"
        }`}
      >
        <motion.div
          className={`flex ${isExpanded ? "flex-col items-center h-full p-4" : "justify-between items-center"}`}
        >
          {isExpanded ? (
            <>
              <motion.button onClick={() => setIsExpanded(false)} className="self-end">
                <ChevronDown size={24} className="text-white" />
              </motion.button>

              {currentAlbumCover && (
                <motion.div>
                  <Image
                    src={currentAlbumCover}
                    alt={`Cover art for ${currentAlbumName}`}
                    height={300}
                    width={300}
                    className="rounded-lg shadow-md mt-4"
                  />
                </motion.div>
              )}

              <motion.h2 className="text-lg font-semibold text-white mt-2">
                {currentTrackName || "No track selected"}
              </motion.h2>
              <motion.p className="text-sm text-gray-300">{currentAlbumName || "Unknown Album"}</motion.p>

              <motion.div className="flex gap-4 mt-4">
                <motion.button onClick={prevTrack} className="text-white p-2">
                  <SkipBack size={24} />
                </motion.button>
                <motion.button onClick={togglePlayPause} className="text-white p-2">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>
                <motion.button onClick={nextTrack} className="text-white p-2">
                  <SkipForward size={24} />
                </motion.button>
              </motion.div>
            </>
          ) : (
            <motion.div layout className="flex items-center w-full justify-between p-2">
              {currentAlbumCover && (
                <motion.div layout>
                  <Image
                    src={currentAlbumCover}
                    alt={`Cover art for ${currentAlbumName}`}
                    height={50}
                    width={50}
                    className="rounded-lg shadow-md"
                  />
                </motion.div>
              )}
              <motion.div layout className="flex flex-col flex-1 ml-2">
                <motion.h2 layout className="text-sm font-semibold text-white">
                  {currentTrackName || "No track selected"}
                </motion.h2>
                <motion.p layout className="text-xs text-gray-300">
                  {currentAlbumName || "Unknown Album"}
                </motion.p>
              </motion.div>
              <motion.div layout className="flex items-center gap-2">
                <motion.button layout onClick={prevTrack} className="text-white p-1">
                  <SkipBack size={20} />
                </motion.button>
                <motion.button layout onClick={togglePlayPause} className="text-white p-1">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>
                <motion.button layout onClick={nextTrack} className="text-white p-1">
                  <SkipForward size={20} />
                </motion.button>
              </motion.div>
              <motion.button layout onClick={() => setIsExpanded(true)} className="text-white ml-2">
                <ChevronUp size={24} />
              </motion.button>
              <motion.button layout onClick={() => setIsVisible(false)} className="text-white ml-2">
                <X size={24} />
              </motion.button>
            </motion.div>
          )}
          <audio ref={audioRef} className="w-full">
            <source src={currentTrack} type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
