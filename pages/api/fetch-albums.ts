import { Pool } from "pg";
import { NextApiRequest, NextApiResponse } from "next";

const pool = new Pool({
  connectionString: process.env.NEON_DB_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const query = `SELECT name, artist_name FROM ALBUMS ORDER BY name ASC`;
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).json({ error: "Database query failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
