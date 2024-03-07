import express from "express";
import dotenv from "dotenv" ;
import authRoutes from "./routes/auth.routes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("serever is ready ")
})

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`server is running in 6000 https://localhost:${PORT}`)
})