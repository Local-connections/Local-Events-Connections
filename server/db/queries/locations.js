import db from "../client.js";

export async function getAllLocations() {
  const sql = `SELECT *
   FROM locations
    ORDER BY name
   `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getLocationById(id) {
  const sql = `SELECT * FROM locations WHERE id = $1`;
  const { rows: [location] } = await db.query(sql, [id]);
  return location;
}