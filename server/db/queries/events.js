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

export async function createEvent(
  title,
  description,
  eventDate,
  eventTime,
  locationId,
  imageUrl,
  organizerId,
  isFree
) {
  const result = await client.query(
    `
      INSERT INTO events (
        title,
        description,
        event_date,
        event_time,
        location_id,
        image_url,
        organizer_id,
        is_free
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `,
    [
      title,
      description,
      eventDate,
      eventTime,
      locationId,
      imageUrl,
      organizerId,
      isFree,
    ]
  );

  return result.rows[0];
}

export async function addEventCategory(eventId, categoryId) {
  await client.query(
    `
      INSERT INTO event_categories (
        event_id,
        category_id
      )
      VALUES ($1, $2);
    `,
    [eventId, categoryId]
  );
}

export async function createTicketType(
  eventId,
  name,
  price,
  quantity,
) {
  const result = await client.query(
    `
      INSERT INTO ticket_types (
        event_id,
        name,
        price,
        quantity
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [eventId, name, price, quantity],
  );

  return result.rows[0];
}