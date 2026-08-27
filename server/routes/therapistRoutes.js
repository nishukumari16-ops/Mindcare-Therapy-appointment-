import express from "express";
import Therapist from "../models/Therapist.js";

const router = express.Router();

// Get all therapists
router.get("/", async (req, res) => {
  try {
    const therapists = await Therapist.find().sort({
      createdAt: -1
    });

    res.json(therapists);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch therapists"
    });
  }
});

// Get one therapist by ID
router.get("/:id", async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist not found"
      });
    }

    res.json(therapist);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch therapist"
    });
  }
});

export default router;