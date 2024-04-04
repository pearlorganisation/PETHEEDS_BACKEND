import express from "express";
import {
  deleteBanner,
  getAllBanner,
  newBanner,
} from "../controllers/banner.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.route("/").get(getAllBanner).post(upload.single("banner"), newBanner);
router.route("/:id").delete(deleteBanner);
export default router;
