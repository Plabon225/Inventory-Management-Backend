import mongoose from "mongoose";

const detailsByIDService = async (id, userEmail, dataModel, populate = []) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { status: "fail", message: "Invalid ID" };
        }
        let query = dataModel.findOne({
            _id: new mongoose.Types.ObjectId(id),
            userEmail
        });
        if (Array.isArray(populate) && populate.length > 0) {
            populate.forEach((item) => {
                query = query.populate(item);
            });
        }
        const data = await query.lean();
        if (!data) {
            return { status: "fail", message: "Data not found" };
        }
        return {status: "success", data};
    } catch (error) {
        return {status: "fail", message: error.message};
    }
};

export default detailsByIDService;