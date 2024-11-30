import { getAlbumNames } from "@/db/actions/albumsAction";
import { AlbumCard } from "@/components/AlbumCard";

const IndexPage = async () => {
  const albums = await getAlbumNames();

  return (
    <div className="flex flex-1 flex-col mx-4 lg:mx-8">
      {albums && (
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
      )}
    </div>
  );
};

export default IndexPage;
