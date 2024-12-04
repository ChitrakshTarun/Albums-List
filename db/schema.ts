import { pgTable, varchar, date, text, integer, boolean, jsonb, primaryKey } from "drizzle-orm/pg-core";

export const albums = pgTable("albums", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  artistName: jsonb("artist_name"),
  releaseDate: date("release_date"),
  url: text("url"),
  trackCount: integer("track_count"),
  genreNames: jsonb("genre_names"),
  copyright: text("copyright"),
  recordLabel: varchar("record_label", { length: 255 }),
  artworkUrl: text("artwork_url"),
  artworkWidth: integer("artwork_width"),
  artworkHeight: integer("artwork_height"),
  artworkBgColor: varchar("artwork_bg_color", { length: 7 }),
  artworkTextColor1: varchar("artwork_text_color1", { length: 7 }),
  artworkTextColor2: varchar("artwork_text_color2", { length: 7 }),
  artworkTextColor3: varchar("artwork_text_color3", { length: 7 }),
  artworkTextColor4: varchar("artwork_text_color4", { length: 7 }),
  contentRating: varchar("content_rating", { length: 50 }),
  editorialNotesStandard: text("editorial_notes_standard"),
  editorialNotesShort: text("editorial_notes_short"),
  isSingle: boolean("is_single"),
  isCompilation: boolean("is_compilation"),
  isComplete: boolean("is_complete"),
});

export const perfectAlbums = pgTable(
  "perfectalbums",
  {
    rank: integer("rank").notNull(),
    albumId: varchar("album_id", { length: 255 })
      .notNull()
      .references(() => albums.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => ({
    compositePk: primaryKey({ columns: [table.rank, table.albumId] }),
  })
);
