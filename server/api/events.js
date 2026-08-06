import express from "express";
import {
  getEvents,
  getEventById,
  getTicketTypesByEventId,
  createEvent,
  addEventCategory,
  createTicketType,
} from "../db/queries/events.js";

import getUserFromToken from "../middleware/getUserFromToken.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});
<<<<<<< HEAD
=======

router.post(
  "/",
  getUserFromToken,
  requireBody([
    "title",
    "description",
    "event_date",
    "event_time",
    "location_id",
    "is_free",
  ]),
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "You must be logged in.",
        });
      }

      const {
        title,
        description,
        event_date,
        event_time,
        location_id,
        image_url,
        is_free,
        category_ids,
        ticket_types,
      } = req.body;
      const event = await createEvent(
      title,
      description,
      event_date,
      event_time,
      location_id,
      image_url ?? null,
      req.user.id,
      is_free,
    );

    if (Array.isArray(category_ids)) {
      for (const categoryId of category_ids) {
        await addEventCategory(event.id, categoryId);
      }
    }

    if (Array.isArray(ticket_types)) {
      for (const ticketType of ticket_types) {
        await createTicketType(
          event.id,
          ticketType.name,
          ticketType.price,
          ticketType.quantity ?? null,
        );
      }
    }

    const createdEvent = {
      ...event,
      categories: category_ids ?? [],
      ticket_types: ticket_types ?? [],
    };

    res.status(201).json(createdEvent);
    } catch (error) {
      next(error);
    }
  },
);

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
>>>>>>> main
