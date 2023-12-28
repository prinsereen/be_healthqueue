import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getRecomendationSeriesById, 
    getRecomendationMovieById, 
    getTrendingMovie, 
    getTrendingSeries,
    getSimilarMovieById,
    getSimilarSeriesById } from "../controllers/Recomendation.js";

const router = express.Router();

router.get('/recomendation/series/:id/:page', verifyToken, getRecomendationSeriesById)
router.get('/recomendation/movie/:id/:page', verifyToken, getRecomendationMovieById)
router.get('/similar/series/:id/:page', verifyToken, getSimilarMovieById)
router.get('/similar/movie/:id/:page', verifyToken, getSimilarSeriesById)
router.get('/trending/series', verifyToken, getTrendingSeries)
router.get('/trending/movie', verifyToken, getTrendingMovie)

export default router;