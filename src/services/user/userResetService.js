import bcrypt from "bcrypt";

const resetPasswordService = async (resetData, userModel, otpModel) => {
    try {
        const { email, otp, password } = resetData;

        if (!email || !otp || !password) {
            return { status: "fail", message: "Email, OTP and password are required" };
        }

        const validOtp = await otpModel.findOne({ email, otp, status: 1 });

        if (!validOtp) {
            return { status: "fail", message: "OTP not verified or invalid" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        await otpModel.deleteOne({ email, otp });

        return { status: "success", message: "Password reset successful" };
    } catch (err) {
        return { status: "fail", message: err.message };
    }
};

export default resetPasswordService;
