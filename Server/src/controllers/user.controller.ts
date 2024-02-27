import express from "express";
import { User } from "../models/user.models";
import { ShiftingRequest } from "../models/request.models";
import { sendMail } from "../utils/mailing";
import bcryptjs from "bcryptjs";

export const createShiftRequest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fromAddress, toAddress } = req.body;

    const user = await User.findById({ _id: req.userId });
    if (!user) {
      return res.status(404).json({
        message: "user not found...",
      });
    }
    const shiftingRequest = new ShiftingRequest({
      fromAddress: fromAddress,
      toAddress: toAddress,
      status: "New",
      rent: Math.floor(Math.random() * 10000),
    });
    await shiftingRequest.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { requests: shiftingRequest._id },
    });
    return res.status(201).json({
      rent: shiftingRequest.rent,
      message: " successfully created shift request...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to send request...",
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
        message: "User does not exist...",
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
      `Click on the link to reset your password: http://localhost:3000/api/user/resetPassword/${resetToken} valid for 15 minutes only`
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
