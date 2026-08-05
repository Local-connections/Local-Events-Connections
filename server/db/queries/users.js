import client from "../client";
import bcrypt from "bcrypt";
import requireBody from "../../middleware/requireBody";

export async function createUser(username, password) {
  const createUserQuery = `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *
    `;
  // Encrypting password when inserting into database
  const hashPassword = await bcrypt.hash(password, 15);
  const {
    rows: [user],
  } = await client.query(createUserQuery, [username, hashPassword]);
  return user;
}

export async function getUser(username, password) {
  const getUserQuery = `
    SELECT * 
    FROM users
    WHERE username = $1
    `;
  const {
    rows: [user],
  } = await client.query(getUserQuery, [username]);
  // Credentials checking
  if (!user) {
    return null;
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return null;
  }
  return user;
}

export async function getUserById(userId) {
  const getUserIdQuery = `
    SELECT * 
    FROM users
    WHERE id = $1
    `;
  const {
    rows: [user],
  } = await client.query(getUserIdQuery, [userId]);
  return user;
}
