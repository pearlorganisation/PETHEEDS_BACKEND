import express from "express";
import { login, signup,getAllUsers, deleteUser } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user",getAllUsers)

router.route("/:id").delete(deleteUser)
export default router;
