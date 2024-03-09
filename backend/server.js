import path from "path";
import express from "express";
import dotenv from "dotenv" ;
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connecToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


dotenv.config();

app.use(express.json());//to parse the incoming requests with json payload(from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


app.use(express.static(path.join(__dirname, "/frontenda/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontenda", "dist", "index.html"));
});

// app.get("/",(req,res)=>{
//     res.send("serever is ready ")
// })


server.listen(PORT, () => {
    connecToMongoDB();
    console.log(`server is running in 5000 https://localhost:${PORT}`)
})