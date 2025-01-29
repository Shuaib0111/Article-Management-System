const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req,res)=>{
    const {name, email, password} = req.body;
    try{
        if(name && email && password){
            const isUserExist = await User.findOne({email});
            if(isUserExist){
                res.json({message: "User already exists",success: false});
            }
            else{
                const hashedPassword = bcrypt.hashSync(password,salt);
                const createdUser = await User.create({
                    name,
                    email,
                    password: hashedPassword
                });
                if(createdUser){
                    res.json({message: "User created successfully...",success: true});
                }else{
                    res.json({message: "User cannot be created",success: false});
                }
            }
        }
        else{
            res.json({message: "All fields are required",success: false});
        }
    }catch(err){
        res.status(400).json({message: err.message, success:false})
    }
}

const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try{
        if(email && password){
            const existingUser = await User.findOne({email});
            if(existingUser){
                const comparedPassword = bcrypt.compareSync(password,existingUser.password);
                if(comparedPassword){
                    let token = jwt.sign({userID : existingUser._id},process.env.JWT_SECRET,{expiresIn: "2d"});
                    res.json({message:"User logged in successfully...",success:true,token:token, user:existingUser});
                }
            }
            else{
                res.json({message:"User does not exist",success: false})
            }
        }
        else{
            res.json({message:"Email and password are required",success:false});
        }
    }catch(err){
        res.status.json({message:err.message,success:false})
    }
}

module.exports = {
    registerUser,
    loginUser
}