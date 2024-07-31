import express from "express";

import upload from "../middlewares/multer.js";
import { deleteReview,getParticularProductReviews,getReviewTotalProducts, newReview } from "../controllers/review.js";

const router = express.Router();

router.route("/").get(getReviewTotalProducts).post(upload.array("reviewImages"), newReview);
router.route("/:id").get(getParticularProductReviews).delete(deleteReview)
export default router;
