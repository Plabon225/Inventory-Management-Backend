const userDetailsService = async (email, dataModel) => {
    try {
        const data = await dataModel.aggregate([{ $match: { email } }]);
        return { status: "success", data };
    } catch (err) {
        return { status: "fail", message: err.message };
    }
};

export default userDetailsService;