import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    name:{
        type: DataTypes.STRING
    },
    jenis_pengguna:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },   
    no_telp:{
        type: DataTypes.STRING
    },
    tgl_lahir:{
        type: DataTypes.DATE
    },
    photo_url:{
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Users;