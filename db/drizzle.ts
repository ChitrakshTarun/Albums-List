import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" });

export const db = drizzle(process.env.NEON_DB_DATABASE_URL!);
