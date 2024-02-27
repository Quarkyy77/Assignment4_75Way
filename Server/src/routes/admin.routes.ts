import express from "express";
import { isUserAuthenticated } from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import {
  createTrain,
  createAndAddCoach,
  getAllTrains,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/createTrain", isUserAuthenticated, checkRole, createTrain);
router.post(
  "/createAndAddCoach",
  isUserAuthenticated,
  checkRole,
  createAndAddCoach
);
router.get("/getAllTrains", isUserAuthenticated, checkRole, getAllTrains);

export default router;
