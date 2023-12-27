import Users from "../models/UserModel.js";

export const subscribe = async(req, res) => {
    const {userId} = req;
    try {
        await Users.update({jenis_pengguna:"subscribed"},{where:{id: userId}})
        return res.status(200).json({msg: "subscribed"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}