import express from "express";
import { getAllBlog, newBlog,deleteBlog } from "../../controllers/blog/blog.js";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken.js";
 


const router = express.Router();
router.route("/").get(getAllBlog).post(verifyTokenMiddleware,newBlog);
router.route("/:id").delete(verifyTokenMiddleware,deleteBlog)
export default router;
