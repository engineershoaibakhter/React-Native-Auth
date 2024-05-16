const jwt=require('jsonwebtoken');
const User=require('../models/User');
const secretKey=require('../controllers/authController')

exports.protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message:"Not Authorized"});
    }

    try {
        console.log("Secret Key in AuthMiddleware is ",secretKey);
        const decoded=jwt.verify(token,secretKey);
        req.user=await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(401).json({message:`Not Authorized because of ${error}`});
        console.log(`Not Authorized because of ${error}`);
    }
}