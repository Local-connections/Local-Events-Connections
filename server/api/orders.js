import express from "express";
import { purchaseTicket } from "../db/queries/orders.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();
export default router;

router.use(getUserFromToken);

router.post("/", requireBody(["ticket_type_id", "quantity"]), async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "You must be logged in.",
        });
      }

      const { ticket_type_id, quantity } = req.body;

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          error: "Quantity must be a positive integer.",
        });
      }

      const order = await purchaseTicket(
        req.user.id,
        ticket_type_id,
        quantity
      );

      res.status(201).json(order);

    } catch (error) {
      if (error.message === "Not enough tickets available") {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === "Ticket type not found") {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }
);