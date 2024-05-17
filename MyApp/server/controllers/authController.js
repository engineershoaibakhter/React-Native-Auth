const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer=require('nodemailer');
const otpGenerator=require('otp-generator')

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
  };
  
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_OF_TRANSPORTER,
        pass:process.env.PASSWORD_OF_TRANSPORTER,
    }
});

export const secretKey = generateSecretKey();

exports.register= async (req,res)=>{
    const {name,email,password}=req.body;
    
    try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already exists"});
        }

        const otp=otpGenerator.generate(6,{uppercase:false,specialChars:false});
        const newUser=new User({name,email,password,otp,otpExpires:Date.now()+3600000}); // 1 hour
        await newUser.save();

        const mailOptions={
            from:process.env.EMAIL_OF_TRANSPORTER,
            to:email,
            subject:'OTP for verification',
            text:`Your OTP is ${otp}`,
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message:"Failed to send OTP"});
            }
            res.status(200).json({success:true,message:'OTP sent'});
        });

        const token=jwt.sign({userId:user._id},secretKey,{
            expiresIn:'6d',
        });

        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({message:'Server Error'});
        console.log(`Server Error and Registration is not running because of ${error}`);
    }
}

exports.verify_otp=async (req,res)=>{
    const {email,otp}=req.body;
    const user=await User.findOne({email,otp,otpExpires:{$gt:Date.now()}});
    if(!user){
        return res.status(400).json({message:'Invalid OTP or OTP expired'});
    }

    user.otp=null;
    user.otpExpires=null;
    await user.save();
    res.status(200).json({success:true,message:'OTP verified'});
}

exports.login=async (req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=jwt.sign({userId:user._id},secretKey,{
            expiresIn:'6d',
        });

        res.json({token});
    } catch (error) {
        res.status(500).json({message:`Server Error and Login is not running because of ${error}`});
    }
}

// Password Reset Endpoint

exports.reset_password=async (req,res)=>{
    const {email} =req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:'User not found'});
    }
    const newPassword=crypto.randomBytes(6).toString('hex');
    user.password=newPassword;
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_OF_TRANSPORTER,
        to: email,
        subject: 'Password Reset',
        text: `Your new password is ${newPassword}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to send new password' });
        }
        res.status(200).json({ success: true, message: 'New password sent' });
    });
    
}