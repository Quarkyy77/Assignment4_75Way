import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentLocation: { type: String },

  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
  documentPath: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

export const Driver = mongoose.model("Driver", driverSchema);
