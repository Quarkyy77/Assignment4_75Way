import mongoose from "mongoose";
const coachSchema = new mongoose.Schema({
  coachNumber: { type: Number, required: true },
  coachSeats: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookingRequest" }],
});

export const Coach = mongoose.model("Coach", coachSchema);
