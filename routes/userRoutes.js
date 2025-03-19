import express from "express";
import {
  getUserData,
  isAuthenticated,
  loginUser,
  logoutUser,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  userRegister,
  verifyemail,
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// ✅ Authenticated user data
router.get("/data", userAuth, getUserData);

// ✅ Register & Login & Logout
router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ✅ Email verification routes
router.post("/send-otp", userAuth, sendVerifyOtp);
router.post("/verify-email", userAuth, verifyemail);

// ✅ Auth check route (frontend can use it)
router.get("/is-auth", userAuth, isAuthenticated);

// ✅ Password reset flow
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
