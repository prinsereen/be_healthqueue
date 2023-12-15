import Profile from "../models/ProfileModel.js";

export const createProfile = async (req, res) => {
    try {
        const { profile_name, contentRating } = req.body;

        const profiles = await Profile.findAll({
            where: {
                userId: req.userId,
            },
        });

        if (profiles.length > 3) {
            return res.status(401).json({ msg: "Profile limit exceeded (not more than 3)" });
        }

        await Profile.create({
            profile_name,
            contentRating,
            userId: req.userId,
        });

        return res.status(200).json({ msg: "Profile created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};