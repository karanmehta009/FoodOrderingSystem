import express from "express";
import cors from "cors";
import dotenv from "dotenv"; //load environment 
import morgan from "morgan";
import connectDB from "./config/db.js";
import useRoutes from "./routes/useRoutes.js";
// import Category from "./models/Category.js";  
import { errrorHandler } from "./middleware/errorMiddleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";



dotenv.config(); // loda .env variable into process.env
connectDB(); // connect to database

//middleware 
const app = express();
app.use(express.json());
app.use(cors());// cross origin resource sharing allow communication between frontend and backend
app.use(morgan("dev")); //show logs in terminal
// app.use("/api/category", Category); //category 
app.use(errrorHandler);
app.use("/api/category", categoryRoutes); 
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);

//routes
//Test Routes
app.use("/api/user", useRoutes);
app.use("/api/cart", cartRoutes);
app.get("/", (req, res) => {
  res.send("Api server is Runing ");
})

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

