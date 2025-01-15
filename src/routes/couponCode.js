import express from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";
import { getAllCouponCodes, isValidCouponCode, newCouponCode, updateCouponCode } from "../controllers/couponCode.js";


const router = express.Router();

router.route("/").get(getAllCouponCodes).post(newCouponCode);
router.route("/:id").delete(updateCouponCode)
router.route("/checkCouponCode").post(isValidCouponCode);
export default router;
