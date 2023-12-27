import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getRecomendationSeriesById, getRecomendationMovieById, getTrendingMovie, getTrendingSeries } from "../controllers/Recomendation.js";

const router = express.Router();

router.get('/recomendation/series/:id/:page', verifyToken, getRecomendationSeriesById)
router.get('/recomendation/movie/:id/:page', verifyToken, getRecomendationMovieById)
router.get('/trending/series', verifyToken, getTrendingMovie)
router.get('/trending/movie', verifyToken, getTrendingSeries)

export default router;