import express from "express";
const app = express();
export default app;

import morgan from "morgan";

//TODO api routes imports here Ex. import usersRouter from "#api/users"
import locationsRouter from "./api/locations.js";
import usersRouter from "./api/users.js";
import eventsRouter from "./api/events.js";
import getUserFromToken from "./middleware/getUserFromToken.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getUserFromToken);
app.use(morgan("dev"));

//TODO: routers goes here Ex.  app.use("/users", usersRouter);
app.use("/locations", locationsRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! something went wrong.");
});
