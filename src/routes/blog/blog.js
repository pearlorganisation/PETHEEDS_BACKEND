import express from "express";
import {
  getAllBlog,
  newBlog,
  deleteBlog,
  updateBlog,
  getBlogBySlug,
} from "../../controllers/blog/blog.js";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();
router.route("/").get(getAllBlog).post(upload.single("banner"), newBlog);
router
  .route("/:id")
  .delete(deleteBlog)
  .patch(upload.single("banner"), updateBlog);
router.route("/single/:slug").get(getBlogBySlug);
export default router;
