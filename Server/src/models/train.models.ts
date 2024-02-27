import mongoose from "mongoose";

const Train = new mongoose.Schema({
  type: { type: String, required: true },
  coaches: { type: mongoose.Schema.Types.ObjectId, required: true },
  ArrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
  fare: { type: Number, required: true },
  startStation: { type: String, required: true },
  Destinations: [{ type: String, required: true }],
  currentStation: { type: String, required: true },
});

export const Vehicle = mongoose.model("Train", Train);
