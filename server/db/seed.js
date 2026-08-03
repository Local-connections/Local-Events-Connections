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
  const hashedPassword = await bcrypt.hash(
    "passsword123",
    10,
  );
  //Add Simple Users
  const usersResult = await client.query(
    `INSERT INTO users (name, last_name, email, password)
    VALUES 
    ($1, $2, $3, $4),
    ($5, $6, $7, $8)
    RETURNING id, email;
    `,
    [
      "Han", "Thu", "han@example.com", hashedPassword,
      "Alex", "Chen", "alex@example.com", hashedPassword,
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
      "Annandale Community Center", "7861-B Heritage Drive", "Annandale", "VA", 22003,
      "Fairfax Regional Library", "10360 North Street", "Fairfax", "VA", 22030,
      "Mosaic District", "2905 District Avenue", "Fairfax", "VA", 22031,
    ],
  );

  console.log(locationsResult.rows);

  //Each location's database ID 
const annandaleLocationId = locationsResult.rows.find(
  (location) =>
    location.name === "Annandale Community Center",
).id;

const fairfaxLocationId = locationsResult.rows.find(
  (location) =>
    location.name === "Fairfax Regional Library",
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
  `);

  console.log(categoriesResult.rows);

  // category Ids
  const businessCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Business",
  ).id;

const culturalCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Cultural or Traditional",
  ).id;

const communityCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Community",
  ).id;

const celebrationCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Celebration",
  ).id;

const salesCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Sales",
  ).id;

const educationalCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Educational",
  ).id;

const entertainmentCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Entertainment",
  ).id;

const foodCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Food & Drinks",
  ).id;

const localSportsCategoryId =
  categoriesResult.rows.find(
    (category) => category.name === "Local Sports",
  ).id;

  console.log("Categories seeded successfully.");

  //Orders
  await client.query(
    `INSERT INTO orders (user_id, ticket_types_id, quantity, total_price, order_status)
    VALUES
    ($1, $2, $3, $4, $5);
    `,
    ["alexId", "businessTicketId", "2", "20.0", "confirmed"],
  );

  console.log("Orders seeded successfully.");


  console.log("Database tables and sample data created successfully.");
};

export default seed;