import express from "express";
import {createProfile} from "../controllers/Profile.js"
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/profile', verifyToken, createProfile)

export default router;