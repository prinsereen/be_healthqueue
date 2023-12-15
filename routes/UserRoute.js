import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/User.js";
import { update } from "../validation/UsersValidation.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = "./assets/profileUser/"
        cb(null, destinationPath)
    },
    filename: (req, file, cb) => {
        cb(
          null,
          `${file.filename}_${Date.now()}${path.extname(file.originalname)}`
        );
      },
})

const upload = multer({ storage: storage });

router.get('/users', verifyToken, getAllUsers)
router.get('/users/:id', verifyToken, getUserById)
router.patch('/users/:id', verifyToken, upload.single('photo_url'), updateUser);
router.delete('/users/:id', verifyToken, deleteUser)

export default router;