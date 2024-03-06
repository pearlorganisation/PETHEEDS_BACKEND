import express from "express";
import { getAllBlog, newBlog } from "../../controllers/blog/blog.js";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken.js";
const router = express.Router();
router.route("/").get(getAllBlog).post(verifyTokenMiddleware, newBlog);
export default router;
