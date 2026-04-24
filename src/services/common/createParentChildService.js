import mongoose from "mongoose";

const createParentChildService = async (data, userEmail, parentModel, childModel, joinPropertyName) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const parentData = {
            ...data.parent,
            userEmail
        };
        const parent = await parentModel.create([parentData], { session });
        const parentId = parent[0]._id;

        const childData = data.childs.map(item => ({
            ...item,
            userEmail,
            [joinPropertyName]: parentId
        }));
        const childs = await childModel.insertMany(childData, { session });

        await session.commitTransaction();
        session.endSession();

        return {status: "success", parent: parent[0], childs};

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        if (error.code === 11000) {
            return { status: "fail", message: "Duplicate entry not allowed" };
        }

        return { status: "fail", message: error.message };
    }
};

export default createParentChildService;