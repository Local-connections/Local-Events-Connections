import express from "express";
const usersRouter = express.Router();
export default usersRouter;

import { createUser, getUser, getUserById } from "../db/queries/users";
import { createToken } from "../utils/jwt";
import requireBody from "../../middleware/requireBody";

usersRouter.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  },
);

usersRouter.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { usernmae, password } = req.body;
    const user = await getUser(username, password);
    if (!user) {
      return res.status(401).send("Invalid username/password.");
    }
    const token = createToken({ id: user.id });
    res.send(token);
  },
);
