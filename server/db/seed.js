import { readFile } from "node:fs/promises";
import bcrypt from "bcrypt";
import client from "./client.js";

const seed = async () => {
  const schema = await readFile(
    new URL("./schema.sql", import.meta.url),
    "utf8",
  );

  await client.query(schema);

  //Users
  //Sample Password
  const hashedPassword = await bcrypt.hash("passsword123", 10);
  //Add Simple Users
  const usersResult = await client.query(
    `INSERT INTO users (name, last_name, email, password)
    VALUES 
    ($1, $2, $3, $4),
    ($5, $6, $7, $8)
    RETURNING id, email;
    `,
    [
      "Han",
      "Thu",
      "han@example.com",
      hashedPassword,
      "Alex",
      "Chen",
      "alex@example.com",
      hashedPassword,
    ],
  );

  //Each user's database ID
  const hanId = usersResult.rows.find(
    (user) => user.email === "han@example.com",
  ).id;

  const alexId = usersResult.rows.find(
    (user) => user.email === "alex@example.com",
  ).id;

  console.log("Users seeded successfully.");

  //Locations
  //Add Simple Locations
  const locationsResult = await client.query(
    `INSERT INTO locations (name, address, city, state, zip)
    VALUES
    ($1, $2, $3, $4, $5),
    ($6, $7, $8, $9, $10),
    ($11, $12, $13, $14, $15)
    RETURNING id, name;
    `,
    [
      "Annandale Community Center",
      "7861-B Heritage Drive",
      "Annandale",
      "VA",
      22003,
      "Fairfax Regional Library",
      "10360 North Street",
      "Fairfax",
      "VA",
      22030,
      "Mosaic District",
      "2905 District Avenue",
      "Fairfax",
      "VA",
      22031,
    ],
  );

  //Each location's database ID 
const annandaleLocationId = locationsResult.rows.find(
  (location) =>
    location.name === "Annandale Community Center",
).id;

  const fairfaxLocationId = locationsResult.rows.find(
    (location) => location.name === "Fairfax Regional Library",
  ).id;

  const mosaicLocationId = locationsResult.rows.find(
    (location) => location.name === "Mosaic District",
  ).id;

  console.log("Locations seeded successfully.");

  //Categories
  const categoriesResult = await client.query(
    `INSERT INTO categories (name)
    VALUES
      ('Business'),
      ('Cultural or Traditional'),
      ('Community'),
      ('Celebration'),
      ('Sales'), 
      ('Educational'), 
      ('Entertaiment'), 
      ('Food & Drinks'), 
      ('Local Sports')
    RETURNING id, name;
  `,
  );

  // category Ids
  const categoryIds = Object.fromEntries(
    categoriesResult.rows.map((category) => [
      category.name,
      category.id,
    ]),
  );

  const businessCategoryId = categoryIds["Business"];
  const culturalCategoryId = categoryIds["Cultural or Traditional"];
  const communityCategoryId = categoryIds["Community"];
  const celebrationCategoryId = categoryIds["Celebration"];
  const salesCategoryId = categoryIds["Sales"];
  const educationalCategoryId = categoryIds["Educational"];
  const entertaimentCategoryId = categoryIds["Entertaiment"];
  const foodCategoryId = categoryIds["Food & Drinks"];
  const localSportsCategoryId = categoryIds["Local Sports"];

  console.log("Categories seeded successfully.");
  

  const eventsResult = await client.query(
    `INSERT INTO events (title, description, event_date, event_time, location_id, image_url, organizer_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7), ($8, $9, $10, $11, $12, $13, $14)
    RETURNING id, title;
    `,
    [
      "Test title",
      "Test description",
      "2000-01-01",
      "00:00:00",
      1,
      "Test image",
      1,
      "Test title #2",
      "Test description #2",
      "2000-01-02",
      "00:00:02",
      2,
      "Test image #2",
      2,
    ],
  );

  const eventId = eventsResult.rows.find(
    (event) => event.title === "Test title",
  ).id;

  const nextEventId = eventsResult.rows.find(
    (event) => event.title === "Test title #2",
  ).id;

  console.log("Events seeded successfully.");

  const eventCategoriesResult = await client.query(
    `
    INSERT INTO event_categories(event_id, category_id)
    VALUES ($1, $2), ($3, $4)
    RETURNING event_id, category_id;
    `,
    [eventId , businessCategoryId, nextEventId, culturalCategoryId,],
  );

  //const firstEventId = eventCategoriesResult.rows.find(
  //  (event_category) => event_category.event_id === eventId,
  //).event_id;

  //const secondEventId = eventCategoriesResult.rows.find(
  //  (event_category) => event_category.event_id === nextEventId,
  //).event_id;

  console.log("Event categories seeded successfully.");

  const ticketTypesResult = await client.query(
    `
    INSERT INTO ticket_types(event_id, name, price, quantity)
    VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)
    RETURNING id, name
    `,
    [1, "Ticket type 1", 50, 1, 2, "Ticket type 2", 100, 2],
  );

  const firstTicketId = ticketTypesResult.rows.find(
    (ticket_type) => ticket_type.name === "Ticket type 1",
  ).id;

  const secondTicketId = ticketTypesResult.rows.find(
    (ticket_type) => ticket_type.name === "Ticket type 2",
  ).id;

  console.log("Ticket types seeded successfully.");

//Orders
  await client.query(
    `INSERT INTO orders (user_id, ticket_types_id, quantity, total_price, order_status)
    VALUES
    ($1, $2, $3, $4, $5);
    `,
    [alexId, firstTicketId, 2, 100, "confirmed",],
  );

  console.log("Orders seeded successfully.");

  console.log("🌱 Database seeded successfully.");
};
export default seed;
