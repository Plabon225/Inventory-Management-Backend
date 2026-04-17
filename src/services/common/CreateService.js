const createService = async (data, userEmail, dataModel) => {
    try {
        const postBody = { ...data, userEmail };
        const result = await dataModel.create(postBody);
        return {status: "success", data: result};

    } catch (error) {
        if (error.code === 11000) {
            return {status: "fail", message: "Duplicate entry not allowed"};
        }
        return {status: "fail", message: error.message};
    }
};

export default createService;


