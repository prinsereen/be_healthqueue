import Profile from "../models/ProfileModel.js";
import Users from "../models/UserModel.js";
import admin from "../config/firebaseConfig.js";

export const createProfile = async (req, res) => {
    try {
        const { profile_name, contentRating } = req.body;
        const { userId } = req;

        const profiles = await Profile.findAll({
            where: {
                userId: userId,
            },
        });

        if (profiles.length >= 6) {
            return res.status(401).json({ msg: "Profile limit exceeded (not more than 6)" });
        }

        const profileImage = req.file;
        let profileUrl = null;

        if (profileImage) {
            const bucket = admin.storage().bucket();
            const filename = `${userId}_${Date.now()}_${profileImage.originalname}`;
            const file = bucket.file(filename);

            const fileBuffer = profileImage.buffer;
            await file.save(fileBuffer, { contentType: profileImage.mimetype });

            profileUrl = `https://storage.googleapis.com/${process.env.storageBucket}/${filename}`;
        }

        const newProfile = await Profile.create({
            profile_name,
            contentRating,
            profileUrl,
            userId,
        });

        await Users.update({current_profile: newProfile.dataValues.id},
            {
                where: {
                    id: userId,
                }
            })

        return res.status(200).json({ msg: "Profile created successfully", profile_name, contentRating, profileUrl, userId});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const changeProfile = async(req, res) => {
    try {
        const { userId } = req;
        const {profileId} = req.body;

        const profiles = await Profile.findAll({
            where: {
                userId: userId,
            },
        });

        const idProfiles = profiles.map(profile => profile.dataValues.id);

        if (!idProfiles.includes(profileId)) {
            return res.status(401).json({msg: "Unathorized not your profile"})
        }

        await Users.update({current_profile: profileId},
            {
                where: {
                    id: userId,
                }
            })

        return res.status(200).json({ msg: "Profile updated successfully", profileId});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const getAllMyProfile = async(req, res) => {
    try {
        const { userId } = req;

        const profiles = await Profile.findAll({
            where: {
                userId: userId,
            },
        });

        const arrProfiles = profiles.map(profile => profile.dataValues);
        return res.status(200).json({msg: "Get Profile Succesfully", profiles: arrProfiles})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}