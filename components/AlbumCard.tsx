import Image from "next/image";
import React from "react";

interface AlbumCardProps {
  index: number;
  name: string;
  artistName: string;
  artworkUrl: string;
}

export const AlbumCard = ({ index, name, artistName, artworkUrl }: AlbumCardProps) => {
  return (
    <div className="flex flex-row gap-4 pb-4 items-center">
      <div className="w-16 text-xl text-center">
        <p>{index + 1}</p>
      </div>
      <div>
        <Image src={artworkUrl} width={50} height={50} alt={`Album cover for ${name} by ${artistName}`} />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-xl">{name}</p>
        <p className="text-red-500">{artistName}</p>
      </div>
    </div>
  );
};
