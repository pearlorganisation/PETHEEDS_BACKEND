import express from "express";

import upload from "../middlewares/multer.js";
import { deleteCategory, getAllCategory, newCategory, updateCategory } from "../controllers/category.js";
const router = express.Router();

router.route("/").get(getAllCategory).post(upload.single("categoryImg"),newCategory)
router.route("/:id").delete(deleteCategory).patch(upload.single("categoryImg"),updateCategory)

export default router;