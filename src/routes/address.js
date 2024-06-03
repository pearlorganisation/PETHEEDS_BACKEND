import express from "express";
import { newAddress } from "../controllers/address.js";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";


const router = express.Router();

router.route("/").post(newAddress)

export default router;