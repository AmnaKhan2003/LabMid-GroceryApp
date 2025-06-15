import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './Database/db.js';
import connectToMongoDB from "./Database/db.js";
import UserRouter from './routes/UserRoutes/UserRoute.js'
import AdminRoutes from "./routes/AdminRoutes/AdminRoute.js";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
const port = 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use('/api/User',UserRouter)
app.use("/api/admin", AdminRoutes);
app.listen(5000, () => {
  connectToMongoDB();
  console.log("Server is running on port 5000");
});
