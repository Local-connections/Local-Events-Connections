import express from "express";
import { getTicketTypes } from "../db/queries/ticketTypes.js";

const router = express.Router();

router.get("/:eventId/ticket-types", async (req, res, next) => {
  try {
    const event = getTicketTypes(req.params.eventId);
    if (!event) {
      return res.status(404).send("Event not found.");
    }
    res.send(event);
  } catch (error) {
    next(error);
  }
});
