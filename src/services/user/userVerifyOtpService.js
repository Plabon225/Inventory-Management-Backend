const userVerifyOtpService = async (email, otp, dataModel) => {
    try {
        const validOtp = await dataModel.findOne({ email, otp, status: 0 });

        if (!validOtp) {
            return { status: "fail", message: "Invalid OTP Code" };
        }

        const result = await dataModel.updateOne(
            { email, otp, status: 0 },
            { $set: { status: 1 } }
        );

        return { status: "success", data: result };
    } catch (err) {
        return { status: "fail", message: err.message };
    }
};

export default userVerifyOtpService;
