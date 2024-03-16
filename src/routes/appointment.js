import express from "express";
import { getAllAppointments, newAppointment ,deleteAppointment} from "../controllers/appointment.js";

const router = express.Router();

router.route("/").get(getAllAppointments).post(newAppointment);
router.route('/:id').delete(deleteAppointment)

export default router;