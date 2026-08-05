import client from "../client.js";

export async function getEvents() {
  const result = await client.query(`
    SELECT *
    FROM events
    ORDER BY event_date, event_time;
  `);

  return result.rows;
}