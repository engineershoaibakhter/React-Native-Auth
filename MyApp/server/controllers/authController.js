const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto = require("crypto");


const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();

exports.register= async (req,res)=>{
    const {name,email,password}=req.body;

    try {
        const user=new User({name,email,password});
        await user.save();

        const token=jwt.sign({userId:user._id},secretKey,{
            expiresIn:'6d',
        });

        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({message:'Server Error'});
        console.log(`Server Error because of ${error}`);
    }
}