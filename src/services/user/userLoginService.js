import createToken from "../../../utility/createToken.js";
import bcrypt from "bcrypt";

const userLoginService = async (loginData, dataModel) => {
    try {
        const user = await dataModel.findOne({ email: loginData.email });
        if (!user) {
            return { status: "unauthorized", message: "User not found" };
        }
        const isMatch = await bcrypt.compare(loginData.password, user.password);
        if (!isMatch) {
            return { status: "unauthorized", message: "Wrong password" };
        }
        const token = await createToken({ email: user.email });
        return { status: "success", data: token };
    } catch (err) {
        return {status: "fail", message: err.message};
    }
}

export default userLoginService;