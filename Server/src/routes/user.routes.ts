import express from "express";
import { isUserAuthenticated } from "../middlewares/auth";
import {
  createShiftRequest,
  updatePassword,
  resetPassword,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/createShiftRequest", isUserAuthenticated, createShiftRequest);
router.post("/updatePassword", updatePassword);
router.post("/reset-password/:token", resetPassword);
export default router;
