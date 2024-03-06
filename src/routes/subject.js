import express from "express";
import {
  deleteSubject,
  getAllSubjects,
  newSubject,
  updateSubject,
} from "../controllers/subject.js";

const router = express.Router();

router.route("/").get(getAllSubjects).post(newSubject);
router.route("/:id").delete(deleteSubject).patch(updateSubject);
export default router;
