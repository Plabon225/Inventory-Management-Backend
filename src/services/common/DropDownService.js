const dropDownService = async (userEmail, dataModel, projection) => {
    try {
        const data = await dataModel.aggregate([
            { $match: { userEmail: userEmail } },
            { $project: projection }
        ]);

        return {status: "success", data: data};

    } catch (error) {
        return {status: "fail", message: error.message};
    }
};

export default dropDownService;