import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getTopRatedMovie, getLatestMovie, getOldestMovie, getUpcomingtMovie, getDetailMovie, getPopularMovie,getBestSellingMovie } from "../controllers/Video.js";

const router = express.Router();

router.get('/toprated/:page', verifyToken, getTopRatedMovie)
router.get('/upcoming/:page', verifyToken, getUpcomingtMovie)
router.get('/latest/:page', verifyToken, getLatestMovie)
router.get('/oldest/:page', verifyToken, getOldestMovie)
router.get('/movie/:id', verifyToken, getDetailMovie)
router.get('/popular/:page', verifyToken, getPopularMovie)
router.get('/bestselling/:page', verifyToken, getBestSellingMovie)

export default router;