import express from "express"
import db from "./config/Database.js";
/* import Users from "./models/UserModel.js";
import Profile from "./models/ProfileModel.js"; */
import AuthRoute from "./routes/AuthRoute.js"
import VideoRoute from "./routes/VideoRoute.js"
import ProfileRoute from "./routes/ProfileRoute.js"
import SearchRoute from "./routes/SeaerchRoute.js"
import RecomendationRoute from "./routes/RecomendationRoute.js"
import SubscribeRoute from "./routes/SubscribeRoute.js"
import WatchListRoute from "./routes/WatchListRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())
app.use(express.json())
app.use(AuthRoute)
app.use(UserRoute)
app.use(VideoRoute)
app.use(ProfileRoute)
app.use(SearchRoute)
app.use(RecomendationRoute)
app.use(SubscribeRoute)
app.use(WatchListRoute)

app.listen(5000, ()=> console.log("server running on port 5000"))