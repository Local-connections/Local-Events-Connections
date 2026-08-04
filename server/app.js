import express from "express";
const app = express();
export default app;

import morgan from "morgan";

//TODO api routes imports here Ex. import usersRouter from "#api/users"


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

//TODO: routers goes here Ex.  app.use("/users", usersRouter);

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
  console.err(err);
  res.status(500).send("Sorry! something went wrong.")
});

