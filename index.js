import express from "express"
import db from "./config/Database.js";
/* import Users from "./models/UserModel.js";
import Profile from "./models/Profile.js"; */
import AuthRoute from "./routes/AuthRoute.js"
import VideoRoute from "./routes/VideoRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";
import admin from 'firebase-admin';
import serviceAccount from '.visionary-9f018-firebase-adminsdk-k9wr7-448a58875d.json';

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
  storageBucket: 'https://console.firebase.google.com/u/0/project/visionary-9f018/storage/visionary-9f018.appspot.com/files', 
});

const bucket = admin.storage().bucket();

app.use(cookieParser())
app.use(express.json())
app.use(AuthRoute)
app.use(UserRoute)
app.use(VideoRoute)

app.listen(5000, ()=> console.log("server running on port 5000"))