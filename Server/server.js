import express from "express";
import cors from "cors";
import dotenv from "dotenv"; //load environment 
import morgan from "morgan";
import connectDB from "./config/db.js";
import useRoutes from "./routes/useRoutes.js"

dotenv.config(); // loda .env variable into process.env
connectDB(); // connect to database

//middleware 
const app = express();
app.use(express.json());
app.use(cors());// cross origin resource sharing allow communication between frontend and backend
app.use(morgan("dev")); //show logs in terminal

//Test Routes
app.use("/api/user", useRoutes);
app.get("/", (req, res) => {
  res.send("Api server is Runing ");
})

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})