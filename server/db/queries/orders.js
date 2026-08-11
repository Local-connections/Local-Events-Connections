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