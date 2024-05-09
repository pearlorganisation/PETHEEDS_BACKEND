import express from "express";
import {
  deleteBanner,
  getAllBanner,
  newBanner,
  updateBanner,
} from "../controllers/banner.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/").get(getAllBanner).post(upload.single("banner"), newBanner);
router.route("/:id").delete(deleteBanner).patch(upload.single("banner"),updateBanner );
export default router;
