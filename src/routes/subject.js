import express from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";

import {
  deleteSubject,
  getAllSubjects,
  newSubject,
  updateSubject,
} from "../controllers/subject.js";

const router = express.Router();

router.route("/").get(getAllSubjects).post(verifyTokenMiddleware,newSubject);
router.route("/:id").delete(verifyTokenMiddleware,deleteSubject).patch(verifyTokenMiddleware,updateSubject);
export default router;
