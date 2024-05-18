const express=require('express');
const {register,login,verify_otp,reset_password,resend_otp}=require('../controllers/authController');

const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/verify_otp',verify_otp)
router.post('/reset_password',reset_password)
router.post('/resend_otp',resend_otp)


module.exports=router;