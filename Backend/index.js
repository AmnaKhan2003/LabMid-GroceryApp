import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoute.js";
import connectToMongoDB from "./Database/db.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/admin", AdminRoutes);
app.listen(5000, () => {
  connectToMongoDB();
  console.log("Server is running on port 5000");
});
