import express from "express";
import {
  deleteCallbackRequest,
  getAllCallbackRequests,
  newCallBackRequest,
} from "../../controllers/enquiryRequest/callbackRequests.js";
const router = express.Router();
router.route("/").get(getAllCallbackRequests).post(newCallBackRequest);
router.route("/:id").delete(deleteCallbackRequest);
export default router;
