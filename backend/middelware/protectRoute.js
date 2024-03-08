import  jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next)=>{
    try{
       const token = req.cookies.jwt;

       if(!token){
        return res.status(401).json({error:"Unathorized - no token provided"});
       }

       const decoded = jwt.verify(token,process.env.JWT_SECRET);

       if(!decode){
        return res.status(401).json({error:"Unauthorized - invalid token"})
       }

       const user = await User.findById(decoded.userId).select("-password");

      if(!user){
        return res.status(404).json({error:"user not found"})
      }

      req.user = user

      next();
    }
    catch(error){
        console.log("error is in the protectRoute.js middelware"  , error.message)
        res.status(500).json({error:"internal server error"})
    }
};  

export default protectRoute;