import db from "../client.js";

export async function getTicketTypes(eventId) {
  const sql = `
    SELECT id, name, price, quantity
    FROM ticket_types
    WHERE event_id = $1
    ORDER BY price;
    `;
  const result = await db.query(sql, [eventId]);
  return result.rows;
}
