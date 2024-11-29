"use server";
import { db } from "@/db/drizzle";
import { albums } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const getAlbumNames = async () => {
  const data = await db
    .select({
      name: albums.name,
      artistName: albums.artistName,
    })
    .from(albums)
    .orderBy(asc(albums.name));
  return data;
};

export const getAlbumById = async (id: string) => {
  const [album] = await db.select().from(albums).where(eq(albums.id, id));
  return album;
};
