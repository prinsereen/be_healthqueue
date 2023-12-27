import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { subscribe } from "../controllers/Subscribe.js";

const router = express.Router();

router.patch('/subscribe', verifyToken, subscribe)

export default router;