import express from "express";
import { deleteAddress, getAllAddresses, getParticularUserAddress, newAddress, updateAddress } from "../controllers/address.js";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";


const router = express.Router();

router.route("/").get(getAllAddresses).post(newAddress)
router.route("/:id").get(getParticularUserAddress).patch(updateAddress).delete(deleteAddress);

export default router;