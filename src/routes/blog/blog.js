import express from "express";
import {
  getAllBlog,
  newBlog,
  deleteBlog,
  updateBlog,
} from "../../controllers/blog/blog.js";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();
router.route("/").get(getAllBlog).post(upload.single("banner"), newBlog);
router.route("/:id").delete(deleteBlog).patch(upload.single("banner"), updateBlog);
export default router;
