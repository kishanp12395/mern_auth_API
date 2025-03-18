import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { sendOtpOnEmail, sendResetOtpOnEmail, sendWelcomeEmail } from '../email/sendEmail.js'




export const getUserData = async (req,res) => {

    try { 

        const {userId} = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, msg: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        return res.status(200).json({ success: true, 
            userData:{
                name: user.name,
                isAccountVerified: user.isAccountVerified
        } 
    });

    } catch (error) {
        console.error('❌ Error fetching user data:', error.message);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });   
    }
}



export const userRegister = async (req, res) => {
    
    try {
        let { name, email, password } = req.body;

        // Normalize inputs
        name = name?.trim();
        email = email?.trim().toLowerCase();
        password = password?.trim();

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, msg: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'User already exists' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters long' });
        }

         // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set HTTP-only cookie with token
        res.cookie('token', token, {
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
            path: '/',
        });



        // Sending welcome email
        sendWelcomeEmail(name,email);
        

        // Send success response
        return res.status(201).json({
            success: true,
            msg: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error('Error in user registration:', error.message);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};



export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Normalize inputs
        email = email?.trim().toLowerCase();
        password = password?.trim();

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set HTTP-only cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        // Send success response
        return res.status(200).json({
            success: true,
            msg: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Error in user login:', error.message);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};



export const logoutUser = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
            expires: new Date(0), // Expire immediately
            path: '/',
        });

        return res.status(200).json({ success: true, msg: 'Logout successful' });

    } catch (error) {
        console.error('Error in user logout:', error.message);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}



//send verification OTP to User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;
         // Validate input
         if (!userId) {
            return res.status(400).json({ success: false, msg: "User ID is required." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found." });
        }

        if(user.isAccountVerified){
            return res.status(400).json({ success: false, msg: "Account already verified" });        
        }

           const otp =  String(Math.floor(100000 + Math.random() * 900000));

           user.verifyOtp = otp;
           user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;

           await user.save();

           sendOtpOnEmail(otp, user.email)
           return res.status(200).json({ success: true, msg: "OTP sent successfully." });

    } catch (error) {
        console.error("❌ Error sending OTP:", error.message);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
} 


//verify email using otp
export const verifyemail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp) {
        return res.status(400).json({success: false, msg: 'Missing Details'})
    }
    
    try {

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({success: false, msg: 'User Not Found'});
        }
        
        if(user.verifyOtp == '' || user.verifyOtp !== otp){
            return res.status(400).json({success: false, msg: 'Invalid OTP'})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({ success: false, msg: "OTP has expired" });
        }

         // Mark email as verified & clear OTP fields
         user.isAccountVerified = true;
         user.verifyOtp = null;
         user.verifyOtpExpireAt = null;


         await user.save();
         return res.status(200).json({ success: true, msg: "Email verified successfully" });

    } catch (error) {
        return res.status(500).json({success: false, msg: 'Internal Server error'})
    }
}


// check if user is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        // Check if userId is available (set by authentication middleware)
        if (!req.body.userId) {
            return res.status(401).json({ success: false, msg: "Unauthorized. Please log in." });
        }

        return res.json({
            success: true,
            msg: "User is authenticated",
            userId: req.body.userId, // Optionally return user ID
        });

    } catch (error) {
        console.error("❌ Error checking authentication:", error.message);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};



//send password reset otp
export const sendResetOtp = async (req,res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json ({success: false, msg: 'Email is required'})
    }

    try {

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, msg: 'User not found'})
        }

        const otp =  String(Math.floor(100000 + Math.random() * 900000));

           user.resetOtp = otp;
           user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

           await user.save();

           sendResetOtpOnEmail(otp, user.email)
           return res.status(200).json({ success: true, msg: "OTP sent successfully." });

        
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}


//reset password
export const resetPassword = async (req,res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({success: false, msg: 'Invalid credentials'})
    }

    try {

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, msg: 'User not found'})
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.status(400).json({ success: false, msg: 'Invalid OTP' });
        }
        

        if(user.resetOtpExpireAt < Date.now()){
            return res.status(400).json({ success: false, msg: 'OTP expired' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

         // Update password and clear OTP fields
         user.password = hashedPassword;
         user.resetOtp = null;
         user.resetOtpExpireAt = null;

         await user.save();

         return res.status(200).json({ success: true, msg: 'Password reset successful' });

    } catch (error) {
        console.error('❌ Error resetting password:', error.message);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
}


