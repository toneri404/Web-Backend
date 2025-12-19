import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {connectDB} from './config/database.js';
import cookieParser from "cookie-parser";
import userRouter from"./routes/user.router.js";
import productRouter from"./routes/product.router.js";
import orderRouter from"./routes/order.router.js"; 
import cartRouter from"./routes/cart.router.js";

dotenv.config()
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Backend is running guys!");
});

//connect to mongoDB
connectDB();

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);
app.use("/api/carts",cartRouter);

app.listen(port,()=>{
    console.log(`Server is running in http://localhost:${port}`);
});
