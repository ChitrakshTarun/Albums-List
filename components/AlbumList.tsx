import { getAllAlbums } from "@/db/actions/albumsAction";
import React from "react";
import { AlbumCard } from "./ui/AlbumCard";

interface AlbumListProps {
  layout?: "list" | "grid";
}

const AlbumList = async ({ layout = "list" }: AlbumListProps) => {
  const albums = await getAllAlbums();

  return (
    <div>
      <p className="text-center text-4xl py-4">{`Fevenir's Albums List`}</p>
      <p className="text-center text-xl pb-16">{`I have listened to ${albums.length} music albums - so I decided to build a website listing them all.`}</p>

      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4"
            : "space-y-4"
        }
      >
        {albums.map((album, index) => (
          <AlbumCard
            key={album.id}
            index={layout === "list" ? index : undefined}
            name={album.name!}
            artistName={album.artistName!}
            artworkUrl={album.artworkUrl!}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
