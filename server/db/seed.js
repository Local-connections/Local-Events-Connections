import { readFile } from "node:fs/promises";
import bcrypt from "bcrypt";
import client from "./client.js";
import { getEnabledCategories } from "node:trace_events";

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
  await client.query(
    `INSERT INTO users (name, last_name, email, password)
    VALUES 
    ($1, $2, $3, $4),
    ($5, $6, $7, $8);
    `,
    [
      "Han", "Thu", "han@example.com", hashedPassword,
      "Alex", "Chen", "alex@example.com", hashedPassword,
    ],
  );
  console.log("Users seeded successfully.");

  //Locations
  //Add Simple Locations
  await client.query(
    `INSERT INTO Locations (name, address, city, state, zip)
    VALUES
    ($1, $2, $3, $4),
    ($5, $6, $7, $8);
    `,
    [
      "Annandale Community Center", "7861-B Heritage Drive", "Annandale", "VA", 22003,
      "Fairfax Regional Library", "10360 North Street", "Fairfax", "VA", 22030,
      "Mosaic District", "2905 District Avenue", "Fairfax", "VA", 22031,
    ],
  );
  console.log("Locations seeded successfully.")

  //Categories
  await client.query(
    `INSERT INTO categories (name)
    VALUES
    ('Business'),
    ('Cultural or Traditional'),
    ('Community'),('Celebration'),
    ('Sales'), 
    ('Educational'), 
    ('Entertaiment'), 
    ('Food & Drinks'), 
    ('Local Sports');
  `);
  console.log("Categories seeded successfully.");



  console.log("Database tables created successfully.");
};

export default seed;