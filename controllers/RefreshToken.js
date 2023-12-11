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
            const name = user.name
            const jenis_pengguna = user.jenis_pengguna;
            const email = user.email;
            const no_telp = user.no_telp

            const accessToken = jwt.sign({userId, name, email, jenis_pengguna, no_telp}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.json({ token: accessToken, result: {id: userId, jenis_pengguna: jenis_pengguna, email: email, no_telp: no_telp}});
        })
    } catch (error) {
        console.log(error)
    }
}