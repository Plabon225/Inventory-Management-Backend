const checkAssociateService = async (
    parentId,
    userEmail,
    associateModel,
    associateFieldName
) => {
    try {
        const data = await associateModel.findOne({
            [associateFieldName]: parentId,
            userEmail
        });
        if (data) {
            return {status: "fail", message: "Associated data found. Cannot delete."};
        }
        return { status: "success" };
    } catch (error) {
        return {status: "fail", message: error.message};
    }
};

export default checkAssociateService;