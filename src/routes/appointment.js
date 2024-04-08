import express from "express";
import { getAllAppointments, newAppointment ,deleteAppointment} from "../controllers/appointment.js";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";


const router = express.Router();

router.route("/").get(getAllAppointments).post(verifyTokenMiddleware,newAppointment);
router.route('/:id').delete(verifyTokenMiddleware,deleteAppointment)

export default router;