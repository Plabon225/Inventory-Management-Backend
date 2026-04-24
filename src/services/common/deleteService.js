const deleteService = async (id, userEmail, dataModel) => {
    try {
        // 🔥 1. Check if data exists
        const data = await dataModel.findOne({
            _id: id,
            userEmail
        });
        if (!data) {
            return { status: "fail", message: "Data not found" };
        }
        // 🔥 2. Delete data
        const result = await dataModel.deleteOne({
            _id: id,
            userEmail
        });
        return { status: "success", message: "Deleted successfully" };
    } catch (error) {
        return {status: "fail", message: error.message};
    }
};

export default deleteService;