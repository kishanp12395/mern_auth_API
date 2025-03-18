import express from 'express';
import { getUserData, isAuthenticated, loginUser, logoutUser, resetPassword, sendResetOtp, sendVerifyOtp, userRegister, verifyemail } from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js';

const router = express.Router();


router.get('/data', userAuth, getUserData);

router.post('/register',userRegister);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

router.post("/send-otp", userAuth, sendVerifyOtp);
router.post("/verify-email", userAuth, verifyemail);

router.get("/is-auth", userAuth, isAuthenticated);

router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);




export default router;