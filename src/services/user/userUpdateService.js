import bcrypt from "bcrypt";

const userUpdateService = async (email, updateData, dataModel) => {
    try {
        const payload = { ...updateData };

        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        }

        const result = await dataModel.updateOne(
            { email },
            { $set: payload }
        );

        if (!result.matchedCount) {
            return { status: "fail", message: "User not found" };
        }

        return { status: "success", data: result };
    } catch (err) {
        return { status: "fail", message: err.message };
    }
};

export default userUpdateService;
