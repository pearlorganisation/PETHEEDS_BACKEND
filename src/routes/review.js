import express from "express";

import upload from "../middlewares/multer.js";
import { adminGeneratedReview, approvalProductReviews, deleteReview,getParticularProductReviews,getReviewTotalProducts, newReview } from "../controllers/review.js";

const router = express.Router();

router.route("/").get(getReviewTotalProducts).post(upload.array("reviewImages"), newReview);
router.route("/adminGenerated").post(upload.array("reviewImages"), adminGeneratedReview);
router.route("/:id").get(getParticularProductReviews).delete(deleteReview).patch(approvalProductReviews)
export default router;
