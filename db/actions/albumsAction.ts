"use server";
import { db } from "@/db/drizzle";
import { asc, sql } from "drizzle-orm";
import { albums } from "@/db/schema";

export const getAllAlbums = async () => {
  const data = await db
    .select({
      id: albums.id,
      name: albums.name,
      artistName: albums.artistName,
      genreNames: albums.genreNames,
      releaseDate: albums.releaseDate,
      artworkUrl: albums.artworkUrl,
    })
    .from(albums)
    .orderBy(sql`lower(${albums.artistName}[1])`, asc(albums.releaseDate));
  return data.map((album) => ({
    ...album,
    artistName: album.artistName as string[],
    genreNames: album.genreNames as string[],
  }));
};
