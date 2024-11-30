"use server";
import { db } from "@/db/drizzle";
import { asc } from "drizzle-orm";
import { albums } from "@/db/schema";

export const getAllAlbums = async () => {
  const data = await db
    .select({
      id: albums.id,
      name: albums.name,
      artistName: albums.artistName,
      releaseDate: albums.releaseDate,
      artworkUrl: albums.artworkUrl,
    })
    .from(albums)
    .orderBy(asc(albums.artistName), asc(albums.releaseDate));
  return data;
};
