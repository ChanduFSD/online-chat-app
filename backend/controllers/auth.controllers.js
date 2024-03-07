import bcrypt from "bcryptjs";//package used to hash the password so that password are safe 
import User from "../models/user.model.js";

export const signup = async (req,res) =>{
    try{
     const {fullName,username,password,confirmpassword,gender}= req.body;//getting the required data from the inputs for signup


     //***signup a user*** 

      //checking wether the entred password is same as confirm password orelse respond a error saying that passrod do not match
      if(password !== confirmpassword){
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


export const login = (req,res) =>{
    console.log("login user")
}




export const logout = (req,res) =>{
    console.log("logout user")
}

