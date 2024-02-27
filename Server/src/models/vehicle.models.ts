import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  documentPath: {
    type: String,
    required: true,
  },
  isAssigned: { type: Boolean, default: false },

  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
});

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
