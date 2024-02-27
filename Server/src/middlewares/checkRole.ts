import express, { Express, NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.models";

export const checkRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = await User.findById(req.userId);

  if (user.role === "Admin") {
    return res.status(400).json({
      message: "unauthorized access...",
    });
  }
  return next();
};
