const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: String, enum: ["Admin", "User"], default: "User" },
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }],
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  shiftReq: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShiftingRequest" }],
});

export const User = mongoose.model("User", userSchema);
