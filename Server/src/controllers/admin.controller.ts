import express from "express";
import { Driver } from "../models/driver.models";
import { Vehicle } from "../models/vehicle.models";
import { User } from "../models/user.models";
import { ShiftingRequest } from "../models/request.models";
import { sendMail } from "../utils/mailing";
import bcryptjs from "bcryptjs";

export const createDriver = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, Name, email, password, documentPath } = req.body;
    const driver = new Driver({
      Name,
      email,
      password,
      documentPath,
    });
    await driver.save();
    const admin = await User.findById(userId);
    admin?.drivers.push(driver._id);

    return res.status(201).json({
      message: "Driver created successfully...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create driver...",
    });
  }
};

export const createVehicle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, type, documentPath } = req.body;
    const vehicle = new Vehicle({
      type,
      documentPath,
    });
    await vehicle.save();
    const admin = await User.findById(userId);
    admin?.vehicles.push(vehicle._id);
    return res.status(201).json({
      message: "Vehicle created successfully...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create vehicle...",
    });
  }
};

export const getAllDrivers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const drivers = await Driver.find();
    return res.status(200).json({
      drivers,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};

export const getAllVehicles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const vehicles = await Vehicle.find();
    return res.status(200).json({
      vehicles,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};

export const updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Admin does not exist...",
      });
    }
    const resetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getMinutes() + 15); // Expire in 15 minutes
    await User.findByIdAndUpdate(user._id, {
      $set: {
        resetToken,
        resetTokenExpiry,
      },
    });
    sendMail(
      email,
      "Password Reset",
      `Click on the link to reset your password: http://localhost:3000/api/admin/resetPassword/${resetToken} valid for 15 minutes only`
    );
    return res
      .status(200)
      .json({ message: "Password reset link sent to your email..." });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response
) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token...",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await User.findByIdAndUpdate(user._id, {
      $set: {
        password: hashedPassword,
        resetToken: "",
        resetTokenExpiry: "",
      },
    });
    return res.status(200).json({
      message: "Password reset successfully...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};

export const AcceptShiftRequest = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  try {
    const request = await ShiftingRequest.findByIdAndUpdate(id, {
      status: "Approved",
    });
    //assign driver
    return res.status(200).json({
      message: "You will be assigned a driver shortly...",
    });
  } catch (error) {}
};

export const RejectShiftRequest = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  try {
    const request = await ShiftingRequest.findByIdAndUpdate(id, {
      status: "Rejected",
    });
    return res.status(200).json({
      message: "We dont provide services here",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};

export const assignVehicle = async (
  req: express.Request,
  res: express.Response
) => {
  const { vehicleId, driverId } = req.body;
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    const driver = await Driver.findById(driverId);
    if (!vehicle) {
      return res.status(400).json({
        message: "Vehicle not found...",
      });
    }
    if (!driver) {
      return res.status(400).json({
        message: "Driver not found...",
      });
    }
    driver?.vehicles.push(vehicleId);
    await driver?.save();
    return res.status(200).json({
      message: "Vehicle assigned to driver successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};

export const assignDriverToShift = async (
  req: express.Request,
  res: express.Response
) => {
  const { driverId, shiftId } = req.body;
  try {
    const driver = await Driver.findById(driverId);
    const shift = await ShiftingRequest.findById(shiftId);
    if (!driver) {
      return res.status(400).json({
        message: "Driver not found...",
      });
    }
    if (!shift) {
      return res.status(400).json({
        message: "Shift not found...",
      });
    }
    if (shift?.status !== "Approved") {
      return res.status(400).json({
        message: "Shift not approved...",
      });
    }
    shift.driver = driverId;
  } catch (error) {
    return res.status(500).json({
      message: "Server Error...",
    });
  }
};
