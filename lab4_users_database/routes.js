import express from "express";
import User from "./models/User.js";

const router = express.Router();

// Create User (POST)
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.validate();
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
