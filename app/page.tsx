import { getAlbumNames } from "@/db/actions/albumsAction";

const IndexPage = async () => {
  const albums = await getAlbumNames();

  return (
    <div className="flex flex-1 flex-col mx-8">
      <p className="text-center text-5xl py-16">this will be styled better.</p>

      {albums && (
        <div>
          <p className="text-center text-2xl py-4">{`Fevenir's Albums List - ${albums.length} Albums`}</p>
          <ul>
            {albums.map((album, index) => (
              <li key={index}>
                {index + 1} - {album.name} ({album.artistName})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
