import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { search } from "../controllers/Search.js";

const router = express.Router();

router.get('/search/:query/:page', verifyToken, search)

export default router;