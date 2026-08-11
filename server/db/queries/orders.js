import client from "../client.js";

export async function purchaseTicket(userId, ticketTypeId, quantity) {

    const SQL = `
      SELECT *
      FROM ticket_types
      WHERE id= $1
    `;

    const {rows:[ticket]} = await client.query(SQL, [ticketTypeId]);

    if (!ticket) {
      throw new Error("Ticket type not found");
    };

    if (ticket.quantity !== null && ticket.quantity < quantity) {
      throw new Error("Not enough tickets available");
    }
    const totalPrice  = parseFloat((ticket.price)* quantity).toFixed(2);

    if (ticket.quantity !== null){
      await client.query(
        `UPDATE ticket_types
        SET quantity = quantity - $1
        WHERE id = $2`,
        [quantity, ticketTypeId]
      );
    }

        const { rows: [order] } = await client.query(
        `INSERT INTO orders (user_id, ticket_types_id, quantity, total_price, order_status)
        VALUES ($1, $2, $3, $4, 'confirmed')
        RETURNING *`,
        [userId, ticketTypeId, quantity, totalPrice]
      );
    return order;
}

export async function getOrdersByUser(userId){
  const sql = `
    SELECT
    orders.id,
    orders.quantity,
    orders.total_price,
    orders.order_status,
    orders.created_at,
    ticket_types.name AS ticket_type_name,
    events.title AS event_title
    FROM orders
    JOIN ticket_types ON orders.ticket_types_id = ticket_types.id
    JOIN events ON ticket_types.event_id = events.id
    WHERE orders.user_id = $1;
      `;
  const { rows } = await client.query(sql, [userId]);
  return rows;
}

export async function getOrderById(orderId){
  const sql = `
    SELECT
      orders.*,
      ticket_types.name AS ticket_type_name,
      events.title AS event_title,
      events.event_date,
      events.event_time,
      locations.name AS location_name,
      locations.address,
      locations.city,
      locations.state,
      locations.zip
    FROM orders
    JOIN ticket_types ON orders.ticket_types_id = ticket_types.id
    JOIN events ON ticket_types.event_id = events.id
    JOIN locations ON events.location_id = locations.id
    WHERE orders.id = $1;
      `;
  const { rows: [order]} = await client.query(sql, [orderId]);
  return order;
  }