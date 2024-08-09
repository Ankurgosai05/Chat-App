import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';

// dotenv.config({});
 export const register = async (req,res)=>{
    try{
        const {fullname,username,password, confirmPassword, gender} = req.body;
        if(!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({msg:"All fields are required"});

        }
        if(password !== confirmPassword){
            return res.status(400).json({msg:"Password do not match"});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({msg:"This username already exists"});
        }

        // password bcrypt encrypetd algoritham
        const hashedPassword = await bcrypt.hash(password,12);

        // profile pic boy
        const maleProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`;


        await User.create ({
            fullname,
            username,
            password : hashedPassword,
            profilepic: gender === "male"? maleProfilePic : femaleProfilePic,
            gender,
        });
        return res.status(201).json({
            msg:"User registered successfully",
            success:true

        });

    }catch(error){
        return res.status(500).json({msg:error.message});
    }
};

export const login = async (req,res)=>{

    try{
        const {username,password}= req.body;

        if(!username || !password){
            return res.status(400).json({msg:"All fileds are required"})
        }
        const user = await  User.findOne({username});
        if(!user){
            return res.status(400).json({
                msg:"Incorrect username ",
                success:false

            });
        };

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            msg:"Incorrect password",
            success:false
        })

    };
    const tokendata ={
        userId:user._id,
    }
    const token = await jwt.sign(tokendata,process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        return res.status(200).cookie("token",token,{maxAge: 24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
            _Id:user._id,
            username:user.username,
            fullname:user.fullname,
            profilepic:user.profilepic,

        })

    
    
    }


    catch (error){
        console.log(error);

    }
}

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({msg:"Logged out successfully"});        
    } catch (error) {
        console.log(error);
        
    }
}


export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}