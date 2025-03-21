"use client";
import Image from "next/image";
import React from "react";
import { usePlayback } from "@/providers/PlaybackProvider";

interface AlbumCardProps {
  index?: number;
  name: string;
  artistName: string[];
  genreName: string[];
  artworkUrl: string;
  firstSong: string | null;
  firstSongUrl: string | null;
  layout?: "list" | "grid";
}

export const AlbumCard = ({
  index,
  name,
  artistName,
  artworkUrl,
  firstSong,
  firstSongUrl,
  layout = "list",
}: AlbumCardProps) => {
  const { setTrack } = usePlayback();

  return (
    <div
      className={`cursor-pointer ${
        layout === "list"
          ? "flex flex-row gap-4 items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300"
          : "bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-300"
      }`}
      onClick={() => firstSongUrl && setTrack(firstSongUrl, firstSong)}
    >
      {layout === "list" && (
        <div className="w-8 lg:w-16 text-xl text-center flex-shrink-0">
          <p>{index! + 1}</p>
        </div>
      )}
      <div className={layout === "list" ? "flex-shrink-0" : "aspect-square"}>
        <Image
          src={artworkUrl}
          width={layout === "list" ? 50 : 300}
          height={layout === "list" ? 50 : 300}
          alt={`Album cover for ${name} by ${artistName.join(", ")}`}
          className={layout === "list" ? "rounded-md" : "w-full h-full object-cover"}
        />
      </div>
      <div className={`flex flex-1 flex-col min-w-0 ${layout === "grid" ? "p-4" : ""}`}>
        <p className={`truncate ${layout === "grid" ? "text-center text-lg" : "text-xl"}`}>{name}</p>
        <p className={`truncate text-red-500 ${layout === "grid" ? "text-center text-md" : ""}`}>
          {artistName.join(", ")}
        </p>
      </div>
    </div>
  );
};
