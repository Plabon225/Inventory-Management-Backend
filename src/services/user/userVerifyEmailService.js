import { sendEmailUtility } from "../../../utility/sendEmailUtility.js";
import OTPModel from "../../models/user/OTPModel.js";

const userVerifyEmailService = async (email, dataModel) => {
    try {
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const user = await dataModel.findOne({ email });

        if (!user) {
            return { status: "fail", message: "No User Found" };
        }

        await OTPModel.create({ email, otp: otpCode });

        const emailResponse = await sendEmailUtility(
            email,
            `Your PIN Code is = ${otpCode}`,
            "Inventory Management PIN Verification"
        );

        return { status: "success", data: emailResponse };
    } catch (err) {
        return { status: "fail", message: err.message };
    }
};

export default userVerifyEmailService;
