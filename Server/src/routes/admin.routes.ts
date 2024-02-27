import express from "express";
import { isUserAuthenticated } from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import { upload } from "../utils/multerUpload";
import {
  createDriver,
  createVehicle,
  getAllDrivers,
  getAllVehicles,
  updatePassword,
  resetPassword,
  AcceptShiftRequest,
  RejectShiftRequest,
  assignVehicle,
  assignDriverToShift,
} from "../controllers/admin.controller";

const router = express.Router();

router.post(
  "/createDriver",
  isUserAuthenticated,
  checkRole,
  upload.single("picture"),
  createDriver
);
router.post(
  "/createVehicle",
  isUserAuthenticated,
  checkRole,
  upload.single("picture"),
  createVehicle
);
router.get("/getAllDrivers", isUserAuthenticated, checkRole, getAllDrivers);
router.get("/getAllVehicles", isUserAuthenticated, checkRole, getAllVehicles);

router.post(
  "/AcceptShiftRequest",
  isUserAuthenticated,
  checkRole,
  AcceptShiftRequest
);
router.post(
  "/RejectShiftRequest",
  isUserAuthenticated,
  checkRole,
  RejectShiftRequest
);
router.post("/assignVehicle", isUserAuthenticated, checkRole, assignVehicle);
router.post(
  "/assignDriverToShift",
  isUserAuthenticated,
  checkRole,
  assignDriverToShift
);

export default router;
