import express from "express";
import {
  deleteBlogCategory,
  getAllBlogCategories,
  newBlogCategory,
  updateBlogCategory,
} from "../../controllers/blog/blogCategory.js";
const router = express.Router();
router.route("/").get(getAllBlogCategories).post(newBlogCategory);
router.route("/:id").patch(updateBlogCategory).delete(deleteBlogCategory);
export default router;
