import express from "express";
import { login, signup,getAllUsers } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user",getAllUsers)
export default router;
