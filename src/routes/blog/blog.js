import express from "express";
import { getAllBlog, newBlog,deleteBlog } from "../../controllers/blog/blog.js";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken.js";
 


const router = express.Router();
router.route("/").get(getAllBlog).post( newBlog);
router.route("/:id").delete(deleteBlog)
export default router;
