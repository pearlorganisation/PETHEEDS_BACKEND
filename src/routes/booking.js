import express from "express";
import { bookingOrder, createCodOrder, getAllBookings, verifyOrder } from "../controllers/booking.js";


const router = express.Router();
router.post("/bookingOrder", bookingOrder);
router.post("/codOrder", createCodOrder);
router.post("/verifyOrder/:id", verifyOrder);
router.route("/").get(getAllBookings);


export default router;