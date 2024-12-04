import React from "react";
import { AlbumCard } from "@/components/ui/AlbumCard";
import { getAllAlbums } from "@/db/actions/albumsAction";

interface AlbumListProps {
  layout?: "list" | "grid";
}

const AlbumList = async ({ layout = "list" }: AlbumListProps) => {
  const albums = await getAllAlbums();

  return (
    <div>
      <p className="text-center text-4xl">{`Fevenir's Albums List`}</p>
      <p className="text-center text-xl py-8">{`I've listened to ${albums.length} music albums - so I decided to create a website to track them all.`}</p>

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
            artistName={album.artistName}
            genreName={album.genreNames}
            artworkUrl={album.artworkUrl!}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
