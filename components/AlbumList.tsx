import { getAllAlbums } from "@/db/actions/albumsAction";
import React from "react";
import { AlbumCard } from "./ui/AlbumCard";

const AlbumList = async () => {
  const albums = await getAllAlbums();
  return (
    <div>
      <p className="text-center text-4xl py-4">{`Fevenir's Albums List`}</p>
      <p className="text-center text-xl pb-16">{`The following is the list of the ${albums.length} albums I have heard.\nThis website is to be updated and styled further.`}</p>

      <ul>
        {albums.map((album, index) => (
          <AlbumCard
            index={index}
            key={album.id}
            name={album.name!}
            artistName={album.artistName!}
            artworkUrl={album.artworkUrl!}
          />
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
