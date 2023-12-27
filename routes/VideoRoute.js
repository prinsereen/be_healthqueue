import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getDetailEpisode, getTopRatedMovie, getLatestMovie, getOldestMovie, getUpcomingtMovie, getDetailMovie, getPopularMovie,getBestSellingMovie, getDetailSeries} from "../controllers/Video.js";

const router = express.Router();

router.get('/toprated/:page', verifyToken, getTopRatedMovie)
router.get('/upcoming/:page', verifyToken, getUpcomingtMovie)
router.get('/latest/:page', verifyToken, getLatestMovie)
router.get('/oldest/:page', verifyToken, getOldestMovie)
router.get('/movie/:id', verifyToken, getDetailMovie)
router.get('/series/:id', verifyToken, getDetailSeries)
router.get('/popular/:page', verifyToken, getPopularMovie)
router.get('/bestselling/:page', verifyToken, getBestSellingMovie)
router.get('/episode/:series_id/:season_number/:episode_number', verifyToken, getDetailEpisode)

export default router;