import express from "express";
import {
  deleteSubject,
  getAllSubjects,
  newEnquirySubject,
  updateSubject,
} from "../../controllers/enquiryRequest/enquirySubject.js";

const router = express.Router();
router.route("/").get(getAllSubjects).post(newEnquirySubject);
router.route("/:id").patch(updateSubject).delete(deleteSubject);
export default router;
