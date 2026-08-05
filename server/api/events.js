import express from "express";
import { getEvents } from "../db/queries/events.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

export default router;