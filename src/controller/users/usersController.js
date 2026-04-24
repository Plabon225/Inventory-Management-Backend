import createUserService from "../../services/user/userCreateService.js";
import userDetailsService from "../../services/user/userDetailsService.js";
import userLoginService from "../../services/user/userLoginService.js";
import userUpdateService from "../../services/user/userUpdateService.js";
import userVerifyEmailService from "../../services/user/userVerifyEmailService.js";
import userVerifyOtpService from "../../services/user/userVerifyOtpService.js";
import resetPasswordService from "../../services/user/userResetService.js";
import UsersModel from "../../models/user/UsersModel.js";
import OTPModel from "../../models/user/OTPModel.js";

export const registration = async (req, res) => {
    try {
        const result = await createUserService(req.body);
        if (result.status === "fail") {
            const statusCode = result.data?.keyPattern ? 409 : 400;
            return res.status(statusCode).json(result);
        }
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const result = await userLoginService(req.body, UsersModel);
        const statusCode = result.status === "success" ? 200 : (result.status === "unauthorized" ? 401 : 400);
        return res.status(statusCode).json(result);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

export const profileUpdate = async (req, res) => {
    try {
        const email = req.user;
        let updateData = req.body;
        const result = await userUpdateService(email, updateData, UsersModel);
        const statusCode = result.status === "success" ? 200 : 400;
        return res.status(statusCode).json(result);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

export const profileDetails = async (req, res) => {
    try {
        const email = req.user;
        const result = await userDetailsService(email, UsersModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ status: "fail", message: "Email is required" });
        }
        const result = await userVerifyEmailService(email, UsersModel);
        const statusCode = result.status === "success" ? 200 : 400;
        return res.status(statusCode).json(result);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.params;
        const result = await userVerifyOtpService(email, otp, OTPModel);
        const statusCode = result.status === "success" ? 200 : 400;
        return res.status(statusCode).json(result);
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const result = await resetPasswordService(req.body, UsersModel, OTPModel);

        const statusCode = result.status === "success" ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};
