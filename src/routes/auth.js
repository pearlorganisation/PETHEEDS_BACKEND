import express from "express";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";
import { login, signup,getAllUsers, deleteUser,logout, resetPassword, refreshToken } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user",getAllUsers)
router.post("/logout",logout)
router.route("/:id").delete(deleteUser)
router.post("/refreshToken",refreshToken)

router.route("/resetPassword").put(resetPassword);
export default router;
