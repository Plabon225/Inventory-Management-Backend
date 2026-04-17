import CustomersModel from "../models/customers/customersModel.js"
import createService from "../services/common/CreateService.js";
import listService from "../services/common/ListService.js";
import dropDownService from "../services/common/DropDownService.js";
import updateService from "../services/common/UpdateService.js";


export const CreateCustomers = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await createService(req.body, userEmail, CustomersModel);

        return result.status === "fail" ? res.status(400).json(result) : res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({status: "fail", message: err.message});
    }
};

export const UpdateCustomers = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userEmail = req.user;

        const result = await updateService(id, data, userEmail, CustomersModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const CustomersList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const searchArray = ["customerName","phone","email","address"]; // তুমি চাইলে আরও field add করতে পারো

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, CustomersModel);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const CustomersDropDown = async (req, res) => {
    try {
        const userEmail = req.user;
        const projection = {_id: 1, name: 1};

        const result = await dropDownService(userEmail, CustomersModel, projection);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};