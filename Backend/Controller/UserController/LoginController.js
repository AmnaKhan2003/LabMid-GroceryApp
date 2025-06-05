import User from "../../Database/UserDatabase/UserSchema.js";
import bcrypt from 'bcryptjs';
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