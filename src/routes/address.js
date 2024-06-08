import express from "express";
import { getAllAddresses, getParticularUserAddress, newAddress } from "../controllers/address.js";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";


const router = express.Router();

router.route("/").get(getAllAddresses).post(newAddress)
router.route("/:id").get(getParticularUserAddress)

export default router;