import express from "express";
import {
  getEvents,
  getEventById,
  getTicketTypesByEventId,
} from "../db/queries/events.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

router.get("/:eventId/ticket-types", async (req, res, next) => {
  try {
    const eventId = Number(req.params.eventId);

    if (!Number.isInteger(eventId) || eventId < 1) {
      return res.status(400).json({
        error: "Event id must be a positive number.",
      });
    }

    const event = await getEventById(eventId);

    if (!event) {
      return res.status(404).json({
        error: "Event not found.",
      });
    }

    const ticketTypes = await getTicketTypesByEventId(eventId);

    res.status(200).json(ticketTypes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: "Event id must be a positive number.",
      });
    }

    const event = await getEventById(id);

    if (!event) {
      return res.status(404).json({
        error: "Event not found.",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

export default router;