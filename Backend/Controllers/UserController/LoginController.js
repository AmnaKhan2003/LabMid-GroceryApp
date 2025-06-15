import User from "../../Database/UserDatabase/UserSchema.js";
import bcrypt from 'bcryptjs';
import { sendAdminToken } from "../../Utilis/Token.js";
export const Login = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user =await User.findOne({email});
        if (!user){
           return  res.status(400).json({message :"Invalid Email!"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json("Invalid password");
        }
        sendAdminToken(res,user.role,"Login Successful",200);
        return res.status(200).json({
            message :  "Login Successfully !",
            user
        })
    }
    catch(error){
        console.log(" Error in Logging member" ,error)
        return res.status(500).json({message : " Server Error !"})
    }
}

export const fetchUser=async(req,res)=>{
    const {email}=req.params;
    console.log(email);
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json("User not found!");
        }
        console.log(user);
        return res.status(200).json({user});
    }
    catch(error){
        console.log("Error in fetching user",error);
        return res.status(500).json({mesage : "Server Error !"});

    }
}
export const EditMember=async(req,res)=>{
    const {email , name , phone , address , password} = req.body;
    try{
        const EditUser = await User.findOne({email});
        if (!EditUser){
            return res.status(400).json({message : "Member Not Found !"});
        }
        EditUser.name = name || EditUser.name;
        EditUser.phone = phone || EditUser.phone;
        EditUser.address = address || EditUser.address;
        const newPassword = await bcrypt.hash(password,10);
        EditUser.password = newPassword;
        await EditUser.save();
    }
    catch(error){
        console.log("Server Error");
        res.status(500).json({message : "Servor Error !"})
    }
}