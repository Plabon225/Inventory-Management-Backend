import ExpenseModel from "../../models/expenses/expenseModel.js";
import createService from "../../services/common/CreateService.js";
import updateService from "../../services/common/UpdateService.js";
import listService from "../../services/common/ListService.js";

export const CreateExpense = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await createService(req.body, userEmail, ExpenseModel);

        return result.status === "fail" ? res.status(400).json(result) : res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({status: "fail", message: err.message});
    }
};


export const UpdateExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userEmail = req.user;

        const result = await updateService(id, data, userEmail, ExpenseModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const ExpenseList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const joinStages = [
            {
                $lookup: {
                    from: "expensetypes",
                    localField: "typeId",
                    foreignField: "_id",
                    as: "type"
                }
            }
        ]


        const searchArray = ["note", "type.name", "amount"];
        const numberFields = ["amount"];

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, ExpenseModel, joinStages,numberFields);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};