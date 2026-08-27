import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    fee: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    about: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Therapist", therapistSchema);