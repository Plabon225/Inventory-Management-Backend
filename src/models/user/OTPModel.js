import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now, expires: 300 } // 5 minutes
}, { versionKey: false });

const OTPModel = mongoose.model("otps", OTPSchema);

export default OTPModel;