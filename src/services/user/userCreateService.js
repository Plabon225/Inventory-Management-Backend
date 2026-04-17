import bcrypt from "bcrypt";
import UsersModel from "../../models/user/UsersModel.js";

const UserCreateService = async (userData, dataModel) => {
    try {
        if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);
        const user = await UsersModel.create(userData);
        return { status: "success", data: user };
    } catch (err) {
        if (err.code === 11000) return { status: "fail", message:"email already exists", data: { keyPattern: err.keyPattern, keyValue: err.keyValue }};
        return { status: "fail", message: err.message };
    }
};

export default UserCreateService;