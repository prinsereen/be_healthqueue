import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Profile = db.define('profile', {
    profile_name: {
        type: DataTypes.STRING
    },
    isKids: {
        type: DataTypes.ENUM('active', 'inactive')
    },
    contentRating: {
        type: DataTypes.STRING
    },
    isParentalLock: {
        type: DataTypes.ENUM('active', 'inactive')
    },
    userId: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

Users.hasMany(Profile);
Profile.belongsTo(Users, { foreignKey: 'userId' });

export default Profile;
