import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Profile = db.define('profile', {
    profile_name: {
        type: DataTypes.STRING
    },
    contentRating: {
        type: DataTypes.STRING
    },
    profileUrl: {
        type: DataTypes.STRING
    },
    watchlist_id:{
        type: DataTypes.INTEGER
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