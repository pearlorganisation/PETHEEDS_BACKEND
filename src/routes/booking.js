import express from "express";
import { bookingOrder, createCodOrder, getAllBookings, getParticularUserBookings, verifyOrder } from "../controllers/booking.js";


const router = express.Router();
router.post("/bookingOrder", bookingOrder);
router.post("/codOrder", createCodOrder);
router.post("/verifyOrder/:id", verifyOrder);
router.route("/").get(getAllBookings);
router.route("/:id").get(getParticularUserBookings);


export default router;