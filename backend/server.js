import express from "express";
import dotenv from "dotenv" ;
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connecToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json());//to parse the incoming requests with json payload(from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

// app.get("/",(req,res)=>{
//     res.send("serever is ready ")
// })


app.listen(PORT,()=>{
    connecToMongoDB();
    console.log(`server is running in 5000 https://localhost:${PORT}`)
})