import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user.id;
            const name = user.name;
            const jenis_pengguna = user.jenis_pengguna;
            const accessToken = jwt.sign({userId, name, jenis_pengguna}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.json({token: accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}