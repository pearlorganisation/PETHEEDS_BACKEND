import express from "express";
import {sendOtp, signupSendOtp, verifyOtp} from "../controllers/mail.js"

const router = express.Router();

router.route("/signupSendOtp").post(signupSendOtp);
router.route("/sendOtp").post(sendOtp);
router.route("/verifyOtp").post(verifyOtp);

export default router;