import express from "express";
import { isUserAuthenticated } from "../middlewares/auth";
import {
  driverLogin,
  driverRegister,
  driverLogout,
  getLocation,
  updatePassword,
  resetPassword,
} from "../controllers/driver.controller";

const router = express.Router();

router.post("/login", driverLogin);
router.post("/register", driverRegister);
router.post("/getLocation", isUserAuthenticated, getLocation);
router.post("/updatePassword", isUserAuthenticated, updatePassword);
router.post("/logout", isUserAuthenticated, driverLogout);
router.post("/reset-password/:token", resetPassword);

export default router;
