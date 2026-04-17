const updateService = async (id, data, userEmail, dataModel) => {
    try {
        const postBody = { ...data };
        delete postBody.email;
        Object.keys(postBody).forEach(key => {
            if (postBody[key] === undefined) {
                delete postBody[key];
            }
        });
        const result = await dataModel.updateOne(
            { _id: id, userEmail },
            { $set: postBody }
        );
        if (result.matchedCount === 0) {
            return { status: "fail", message: "Data not found" };
        }
        if (result.modifiedCount === 0) {
            return { status: "fail", message: "No changes detected" };
        }
        return { status: "success", data: result };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

export default updateService;



