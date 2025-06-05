import User from "../../Database/UserDatabase/UserSchema.js";
import bcrypt from 'bcryptjs'

export const registerController = async(req,res)=>{
    const {name , email ,password}=req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    try{
        const registerUser = await User.findOne({email});
        if (registerUser){
            return res.status(400).json({message : "User Already Exist !"})
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
        const dotCountAfterAt = email.split('@')[1].split('.').length - 1;
        if (!emailRegex.test(email) || dotCountAfterAt > 1) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!regex.test(password)){
            return res.status(400).json({
                message: [
                    "Password must include:",
                    "- Uppercase letter",
                    "- Lowercase letter",
                    "- Number",
                    "- Special character"
                ]
                });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newuser = new User({
            name,
            email,
            password:hashedPassword
        })
        console.log("showing new use")
        console.log(newuser);

        await newuser.save();
       return  res.status(200).json({message:"Register User Successfully" , newuser})
    }
    catch(error){
        console.log("Error in registering ", error);
       return res.status(500).json({message :"Server Error"})
    }
}