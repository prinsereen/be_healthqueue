import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getTopRatedMovie, getLatestMovie, getOldestMovie, getUpcomingtMovie } from "../controllers/Video.js";

const router = express.Router();

router.get('/toprated', verifyToken, getTopRatedMovie)
router.get('/upcoming', verifyToken, getUpcomingtMovie)
router.get('/latest', verifyToken, getLatestMovie)
router.get('/oldest', verifyToken, getOldestMovie)

export default router;