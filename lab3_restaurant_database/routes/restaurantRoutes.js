import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    let sortOrder = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find().sort({
      restaurant_id: sortOrder,
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get restaurants by cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisines: req.params.cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get selected columns and sort by restaurant_id
router.get("/", async (req, res) => {
  try {
    let sortOrder = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find(
      {},
      "_id cuisines name city restaurant_id"
    ).sort({ restaurant_id: sortOrder });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get restaurants where cuisines are 'Delicatessen' and city is not 'Brooklyn'
router.get("/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisines: "Delicatessen",
      city: { $ne: "Brooklyn" },
    })
      .select("cuisines name city -_id")
      .sort({ name: 1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
