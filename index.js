import express from "express"
import db from "./config/Database.js";
/* import Users from "./models/UserModel.js";
import Profile from "./models/ProfileModel.js"; */
import AuthRoute from "./routes/AuthRoute.js"
import VideoRoute from "./routes/VideoRoute.js"
import ProfileRoute from "./routes/ProfileRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";
import admin from 'firebase-admin';
import serviceAccount from './visionary-9f018-firebase-adminsdk-k9wr7-448a58875d.json' assert { type: 'json' };


dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log("Database Connected ...")
    //await db.sync()
} catch (error) {
    console.log(error)
}

app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true, 
    })
  );

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.storageBucket, 
});

const bucket = admin.storage().bucket();

app.use(cookieParser())
app.use(express.json())
app.use(AuthRoute)
app.use(UserRoute)
app.use(VideoRoute)
app.use(ProfileRoute)

app.listen(5000, ()=> console.log("server running on port 5000"))