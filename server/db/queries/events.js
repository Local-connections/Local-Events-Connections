import client from "../client.js";

export async function getEvents() {
  const result = await client.query(`
    SELECT *
    FROM events
    ORDER BY event_date, event_time;
  `);

  return result.rows;
}

export async function getEventById(id) {
  const result = await client.query(
    `
      SELECT *
      FROM events
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
}

export async function getTicketTypesByEventId(eventId) {
  const result = await client.query(
    `
      SELECT id, name, price, quantity
      FROM ticket_types
      WHERE event_id = $1
      ORDER BY price;
    `,
    [eventId],
  );

  return result.rows;
}