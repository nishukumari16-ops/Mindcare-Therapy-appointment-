import express from "express";
import Appointment from "../models/Appointment.js";
import Therapist from "../models/Therapist.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Book an appointment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      therapistId,
      appointmentDate,
      appointmentTime,
      concern
    } = req.body;

    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist not found"
      });
    }

    const alreadyBooked = await Appointment.findOne({
      therapist: therapistId,
      appointmentDate,
      appointmentTime,
      status: "Booked"
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    const appointment = await Appointment.create({
      user: req.userId,
      therapist: therapistId,
      appointmentDate,
      appointmentTime,
      concern
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to book appointment"
    });
  }
});

// Get logged-in user's appointments
router.get("/my-appointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.userId
    })
      .populate("therapist")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch appointments"
    });
  }
});

// Cancel appointment
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.json({
      message: "Appointment cancelled successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to cancel appointment"
    });
  }
});

export default router;