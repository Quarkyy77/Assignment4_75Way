import express from "express";
import { Driver } from "../models/driver.models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mailing";

// Register Driver
// name, email, password
export const driverRegister = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { Name, email, password, role } = req.body;
    if (!Name || !email || !password) {
      res.status(400).json({
        message: "Please provide all necessary credentials...",
      });
    }
    const existingCustomer = await Driver.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        message: "Driver already exists...",
      });
    }
    const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordExpression: RegExp =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (!passwordExpression.test(password.toString())) {
      return res.status(400).json({
        message:
          "Enter valid password with uppercase, lowercase, number & @ between range 7-15...",
      });
    }
    if (!emailExpression.test(email.toString())) {
      return res.status(400).json({ message: "Invalid email address type..." });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new Driver({
      Name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(200).json({
      message: " Driver registered successfully...",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error while registering...",
    });
  }
};

// Login Driver
export const driverLogin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all necessary credentials...",
      });
    }
    const user = await Driver.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist...",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(403).json({
        message: "Wrong Password...",
      });
    }
    const userAuthToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: "40m" }
    );
    const userRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET_KEY || "",
      { expiresIn: "1d" }
    );
    res.cookie("userAuthToken", userAuthToken, { httpOnly: true });
    res.cookie("userRefreshToken", userRefreshToken, { httpOnly: true });
    res.status(200).json({
      message: "Login Successfull...",
      user,
      userAuthToken,
      userRefreshToken,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to login...",
    });
  }
};

// Logout current User
export const driverLogout = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    res.clearCookie("userAuthToken");
    res.clearCookie("userRefreshToken");
    return res.status(200).json({
      message: "Logout Successfull...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to logout...",
    });
  }
};

export const getLocation = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.cookies.userId;
    await Driver.findByIdAndUpdate(id, {
      $set: {
        currentLocation: req.body.location,
      },
    });
    return res.status(201).json({
      message: "Driver's location fetched successfully...",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to fetch driver's location...",
    });
  }
};

export const updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const user = await Driver.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Driver does not exist...",
      });
    }
    const resetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getMinutes() + 15); // Expire in 15 minutes
    await Driver.findByIdAndUpdate(user._id, {
      $set: {
        resetToken,
        resetTokenExpiry,
      },
    });
    sendMail(
      email,
      "Password Reset",
      `Click on the link to reset your password: http://localhost:3000/api/driver/resetPassword/${resetToken}`
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
    const user = await Driver.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token...",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await Driver.findByIdAndUpdate(user._id, {
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
