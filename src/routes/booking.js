import express from "express";
import { bookingOrder, getAllBookings } from "../controllers/booking.js";


const router = express.Router();
router.post("/bookingOrder", bookingOrder);
// router.post("/verifyOrder/:id", verifyOrder);
router.route("/").get(getAllBookings);


export default router;