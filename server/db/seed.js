import { readFile } from "node:fs/promises";
import client from "./client.js";

const seed = async () => {
  const schema = await readFile(
    new URL("./schema.sql", import.meta.url),
    "utf8",
  );

  await client.query(schema);

  console.log("Database tables created successfully.");
};

export default seed;