export const signup = (req,res) =>{
    try{
     const {fullName,username,password,confirmpassword,gender}= req.body;
    }
    catch(error){


    }
};
export const login = (req,res) =>{
    console.log("login user")
}
export const logout = (req,res) =>{
    console.log("logout user")
}

