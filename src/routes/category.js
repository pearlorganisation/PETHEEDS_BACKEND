import express from "express";

import { upload } from "../config/cloudinary.js";
import { deleteCategory, getAllCategory, newCategory } from "../controllers/category.js";
const router = express.Router();

router.route("/").get(getAllCategory).post(upload.single("categoryImg"),newCategory)
router.route("/:id").delete(deleteCategory)

export default router;