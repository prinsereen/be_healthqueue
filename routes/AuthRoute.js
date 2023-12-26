import express from "express";
import {register, login, logout, getMe} from "../controllers/Auth.js"
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Register, Login } from "../validation/AuthValidation.js";

const router = express.Router();

router.post('/register', Register, register)
router.post('/login', Login, login)
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.get('/me', verifyToken, getMe)

export default router;