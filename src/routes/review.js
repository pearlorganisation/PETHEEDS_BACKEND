import express from "express";

import upload from "../middlewares/multer.js";
import { deleteReview,getReviewTotalProducts, newReview } from "../controllers/review.js";

const router = express.Router();

router.route("/").get(getReviewTotalProducts).post(upload.single("photo"), newReview);
router.route("/:id").delete(deleteReview)
export default router;
