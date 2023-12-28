import express from "express";
import {createProfile, changeProfile, getAllMyProfile} from "../controllers/Profile.js"
import { verifyToken } from "../middleware/verifyToken.js";
import multer from 'multer';
//import { create } from "../validation/ProfileValidation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/profile',  verifyToken, upload.single('profileImage'),  createProfile)
router.patch('/profile', verifyToken, changeProfile)
router.get('/profile', verifyToken, getAllMyProfile)

export default router;