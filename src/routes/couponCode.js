import express from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";
import { getAllCouponCodes, newCouponCode, updateCouponCode } from "../controllers/couponCode.js";


const router = express.Router();

router.route("/").get(getAllCouponCodes).post(newCouponCode);
router.route("/:id").patch(updateCouponCode);
export default router;
