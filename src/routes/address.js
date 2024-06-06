import express from "express";
import { getAllAddresses, newAddress } from "../controllers/address.js";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";


const router = express.Router();

router.route("/").get(getAllAddresses).post(newAddress)

export default router;