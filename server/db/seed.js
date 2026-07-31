import client from "./client.js";

const seed = async () => {
  console.log("add logic to create and seed tables");
  for (let i = 0; i < 5; i++) {
    const event = {
      title: "Event title: " + i,
      description: "Event description: " + i,
      event_date: "2000-01-0" + i,
      event_time: "00:00:0" + i,
      location_id: i,
      image_url: "Sample image: " + i,
      organizer_id: i,
    };
    const event_category = {
      event_id: i,
      category_id: i,
    };
    const ticket_type = {
      event_id: i,
      name: "ticket type: " + i,
      price: 10.0 + i,
      quantity: i,
    };
    const eventQuery = `
    INSERT INTO events (title, description, event_date, event_time, location_id, image_url, organizer_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const eventCategoryQuery = `
    INSERT INTO event_categories(event_id, category_id)
    VALUES ($1, $2)
    `;
    const ticketTypeQuery = `
    INSERT INTO ticket_types(event_id, name, price, quantity)
    VALUES ($1, $2, $3, $4)
    `;
    await client.query(eventQuery, event);
    await client.query(eventCategoryQuery, event_category);
    await client.query(ticketTypeQuery, ticket_type);
  }
};

export default seed;
