const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_OF_TRANSPORTER,
    pass: process.env.PASSWORD_OF_TRANSPORTER,
  },
});

const secretKey = generateSecretKey();
module.exports = secretKey;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exists" });
    }

    // const otp = otpGenerator.generate(4, {
    //   alphabets: false, // Disable alphabets
    //   upperCase: false, // Disable uppercase letters
    //   specialChars: false, // Disable special characters
    // });

    function generateNumericOTP(length) {
      const digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    
    const otp = generateNumericOTP(4);

    const currentDateUTC = new Date();
    const currentDatePKT = new Date(currentDateUTC.getTime() + (5 * 60 * 60 * 1000));
    const expiredDate=new Date(currentDatePKT.getTime() + 1 * 60 * 60 * 1000)

    console.log("currentDatePKT ",currentDatePKT);
    console.log("expiredDate ",expiredDate);
    const newUser = new User({
      username,
      email,
      password,
      otp,
      otpExpires: new Date(currentDatePKT.getTime() + 1 * 60 * 60 * 1000),
    }); // 1 hour
    await newUser.save();

    const mailOptions = {
      from: process.env.EMAIL_OF_TRANSPORTER,
      to: email,
      subject: "OTP for verification",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      return res.status(200).json({ success: true, message: "OTP sent" });
    });

    const token = jwt.sign({ userId: User._id }, secretKey, {
      expiresIn: "6d",
    });

    return res.status(201).json({ token });
  } catch (error) {
    console.log(
      `Server Error and Registration is not running because of ${error}`
    );
    return res.status(500).json({ message: "Server Error" });
  }
};

const verify_otp = async (req, res) => {
  const { email, otp } = req.body;

  const currentDateUTC = new Date();
  const currentDatePKT = new Date(currentDateUTC.getTime() + (5 * 60 * 60 * 1000));


  const updatedUser = await User.findOneAndUpdate({
    email,
    otp,
    otpExpires: { $gt:currentDatePKT },
  }, { otp: null, otpExpires: null }, { new: true });
  
  if (!updatedUser) {
    return res.status(400).json({ message: "Invalid OTP or OTP expired" });
  }




  res.status(200).json({ success: true, message: "OTP verified" });
};

// Resend OTP Endpoint
const resend_otp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }


    function generateNumericOTP(length) {
      const digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    
    const otp = generateNumericOTP(4);

    user.otp = otp;
    user.otpExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_OF_TRANSPORTER,
      to: email,
      subject: "OTP for verification",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      res.status(200).json({ success: true, message: "OTP resent" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(
      `Server Error and OTP resending is not running because of ${error}`
    );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "6d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: `Server Error and Login is not running because of ${error}`,
    });
  }
};

// Password Reset Endpoint

const forgot_password = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const mailOptions = {
    from: process.env.EMAIL_OF_TRANSPORTER,
    to: email,
    subject: "Password Reset",
    html: `<p>Please click <a href="http://localhost:8081/screens/reset-password">here</a> to reset your password.</p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to send Reset Password" });
    }
    return res.status(200).json({ success: true, message: "Reset Password sent" });
  });

};

const reset_password = async (req, res) => {
  const { email,password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword= await bcrypt.hash(password,salt);

  const updateUserPassword = await User.findOneAndUpdate({ email },{password:hashedPassword},{new:true});



  if (!updateUserPassword) {
    return res.status(400).json({ message: "The password is not updated" });
  }

  const mailOptions = {
    from: process.env.EMAIL_OF_TRANSPORTER,
    to: email,
    subject: "Password Reset Successfully",
    text: `Congratulations! The password has been updated. Here is your new Password: ${password}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to reset new Password" });
    }
    res.status(200).json({ success: true, message: "Congratulations! The password has been updated" });
  });
};

module.exports = { register, verify_otp, resend_otp, login, reset_password,forgot_password };
