import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createList, addItems, getDetailList, deleteItems } from "../controllers/watchlist.js";

const router = express.Router();

router.post('/list', verifyToken, createList)
router.post('/item', verifyToken, addItems)
router.delete('/item', verifyToken, deleteItems)
router.get('/list', verifyToken, getDetailList)

export default router;