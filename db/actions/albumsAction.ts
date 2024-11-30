"use server";
import { db } from "@/db/drizzle";
import { albums } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const getAlbumNames = async () => {
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

export const getAlbumById = async (id: string) => {
  const [album] = await db.select().from(albums).where(eq(albums.id, id));
  return album;
};
