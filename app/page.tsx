"use client";
import { useEffect, useState } from "react";
import { Album } from "@/utils/types/albums";

const IndexPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/api/fetch-albums");
        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }
        const data = await response.json();
        setAlbums(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);
  return (
    <div className="flex flex-1 flex-col mx-8">
      <p className="text-center text-5xl py-16">this will be styled better.</p>
      {loading && <p className="text-center text-2xl py-4">Loading...</p>}
      {error && <p>There was some peepo error I am ngl.</p>}

      {albums.length > 0 && (
        <div>
          <p className="text-center text-2xl py-4">{`Fevenir's Albums List - ${albums.length} Albums`}</p>
          <ul>
            {albums.map((album, index) => (
              <li key={index}>
                {index + 1} - {album.name} ({album.artist_name})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
