import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllUsers } from "../controllers/User.js";

const router = express.Router();

router.get('/users', verifyToken, getAllUsers)

export default router;