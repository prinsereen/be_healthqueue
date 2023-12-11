import { check, validationResult } from "express-validator";
import Users from "../models/UserModel.js";

export const Register = [
    check('email').isEmail().withMessage('format tidak sesuai')
    .custom(async(email, {req}) => {
        const existingUser = await Users.findOne({
            where: {email: email}
        })
        if (existingUser){
            throw new Error('user sudah terdaftar') 
        }
    }),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('conf_password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
]

export const Login = [
    check('email').isEmail().withMessage('format tidak sesuai')
]