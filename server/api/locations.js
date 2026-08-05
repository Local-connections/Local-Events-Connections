import express from "express";
const router = express.Router();
export default router;

import { getAllLocations, getLocationById } from "../db/queries/locations.js";


router.get("/", async (req, res, next) => {
  try {
    const locations = await getAllLocations();
    res.send(locations);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const location = await getLocationById(req.params.id);
    if (!location) return res.status(404).send("Location not found");
    res.send(location);
  } catch (err) {
    next(err);
  }
});