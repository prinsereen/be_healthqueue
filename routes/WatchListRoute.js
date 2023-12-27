import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createList, addItems, getDetailList } from "../controllers/watchlist.js";

const router = express.Router();

router.post('/list', verifyToken, createList)
router.post('/item', verifyToken, addItems)
router.get('/list', verifyToken, getDetailList)

export default router;