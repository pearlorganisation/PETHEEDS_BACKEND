import express from "express";
import {OrderMail, sendOtp, signupSendOtp, verifyOtp} from "../controllers/mail.js"

const router = express.Router();

router.route("/signupSendOtp").post(signupSendOtp);
router.route("/sendOtp").post(sendOtp);
router.route("/verifyOtp").post(verifyOtp);
router.route("/sendOrderMail/:id").post(OrderMail);

export default router;