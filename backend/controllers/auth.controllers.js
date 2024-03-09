import bcrypt from "bcryptjs";//package used to hash the password so that password are safe 
import User from "../models/user.model.js";

import genarateTokenAndSetCookies from "../utils/genarateTokens.js";

export const signup = async (req,res) =>{
    try{
     const {fullName,username,password,confirmPassword,gender}= req.body;//getting the required data from the inputs for signup


     //***signup a user*** 

      //checking wether the entred password is same as confirm password orelse respond a error saying that passrod do not match
      if(password !== confirmPassword){
        return res.status(400).json({error:"Password do not match"})
      }

       //here we check wheather if there is already a user with same name in database
      const user = await User.findOne({username})

      //respond with error saying user name already exits so that the new user can set new name 
      if(user){
        return res.status(400).json({error:"User name already exists"})
      }


      //hasing the password
        const salt = await bcrypt.genSalt(10);//set as 10 load faster 
        const hasedPassword = await bcrypt.hash(password, salt);


      //https://avatar-placeholder.iran.liara.run/=== random profie picture genarator 
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
       
      //creating the required data for new  user to be genarated
      const newUser = new User({
        fullName,
        username,
        password:hasedPassword,
        gender,
        profilepic: gender === "male" ? boyProfilePic : girlProfilePic
      })

      //newUser.save will save the data into database
       if(newUser){
        //genarate JWT token here
        genarateTokenAndSetCookies(newUser._id, res);
        await newUser.save();

        res.status(201).json({
          _id:newUser._id,
          fullName:newUser.fullName,
          username:newUser.username,
          profilepic:newUser.profilepic
        })
       }else{
        res.status(400).json({error:"invalid user data"})
       }


    }
    //catching the error so that it can be sorted later
    catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({error:"internal server error"})
    }
};
//===================================================================================


export const login =async (req,res) =>{
    try{
       const {username,password} =req.body;
       const user = await User.findOne({username});
       const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

       if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"invalid username or password"});
       }

       genarateTokenAndSetCookies(user._id, res);

       res.status(200).json({
        _id:user._id,
        fullname:user.fullName,
        username:user.username,
        profilepic:user.profilepic,
       });
    }
    catch(error){
        console.log("error in login controller",error.message);
        res.status(500).json({error:"internal server error"})
    }
}

//=================================//=============================================


export const logout = async(req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"});
    }
    catch(error){
        console.log("error in logout controller",error.message);
        res.status(500).json({error:"internal server error"})
    }
};

