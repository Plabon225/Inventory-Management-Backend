import ExpenseTypesModel from "../../models/expenses/expenseTypesModel.js";
import createService from "../../services/common/CreateService.js";
import updateService from "../../services/common/UpdateService.js";
import listService from "../../services/common/ListService.js";
import dropDownService from "../../services/common/DropDownService.js";
import detailsByIDService from "../../services/common/detailsByIDService.js";
import ExpenseModel from "../../models/expenses/expenseModel.js";

export const CreateExpenseTypes = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await createService(req.body, userEmail, ExpenseTypesModel);

        return result.status === "fail" ? res.status(400).json(result) : res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({status: "fail", message: err.message});
    }
};

export const UpdateExpenseTypes = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userEmail = req.user;

        const result = await updateService(id, data, userEmail, ExpenseTypesModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const ExpenseTypesList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const searchArray = ["name"]; // তুমি চাইলে আরও field add করতে পারো

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, ExpenseTypesModel);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const ExpenseTypesDropDown = async (req, res) => {
    try {
        const userEmail = req.user;
        const projection = {_id: 1, name: 1};

        const result = await dropDownService(userEmail, ExpenseTypesModel, projection);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const ExpenseTypesDetailsByID = async (req, res) => {
    try {
        const id = req.params.id;
        const userEmail = req.user;
        const result = await detailsByIDService(
            id,
            userEmail,
            ExpenseTypesModel
        );
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};