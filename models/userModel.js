import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    
    password: {
      type: String,
      required: true
    },

    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Date, default: 0 },
    isAccountVerified: { type: Boolean, default: false },

    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Date, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
