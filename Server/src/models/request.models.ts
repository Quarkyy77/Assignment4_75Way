import mongoose from "mongoose";

const shiftingRequestSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ["Approved", "Rejected", "New"],
    default: "New",
  },
  rent: {
    type: Number,
  },
});

export const ShiftingRequest = mongoose.model(
  "ShiftingRequest",
  shiftingRequestSchema
);
