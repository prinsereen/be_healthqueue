import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getTopRatedMovie, getLatestMovie, getOldestMovie, getUpcomingtMovie, getDetailMovie } from "../controllers/Video.js";

const router = express.Router();

router.get('/toprated/:page', verifyToken, getTopRatedMovie)
router.get('/upcoming/:page', verifyToken, getUpcomingtMovie)
router.get('/latest/:page', verifyToken, getLatestMovie)
router.get('/oldest/:page', verifyToken, getOldestMovie)
router.get('/movie/:id', verifyToken, getDetailMovie)

export default router;