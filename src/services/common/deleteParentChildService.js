import mongoose from "mongoose";

const deleteParentChildService = async (
    parentModel,
    childModel,
    parentId,
    joinFieldName,
    userEmail
) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 🔥 1. Check parent exists & belongs to user
        const parent = await parentModel.findOne({
            _id: parentId,
            userEmail
        }).session(session);

        if (!parent) {
            await session.abortTransaction();
            session.endSession();
            return { status: "fail", message: "Data not found" };
        }

        // 🔥 2. Delete child documents first
        await childModel.deleteMany(
            { [joinFieldName]: parentId, userEmail },
            { session }
        );

        // 🔥 3. Delete parent document
        await parentModel.deleteOne(
            { _id: parentId, userEmail },
            { session }
        );
        await session.commitTransaction();
        session.endSession();

        return { status: "success", message: "Deleted successfully" };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", message: error.message};
    }
};

export default deleteParentChildService;