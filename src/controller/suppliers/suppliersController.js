import SuppliersModel from "../../models/suppliers/suppliersModel.js"
import createService from "../../services/common/CreateService.js";
import listService from "../../services/common/ListService.js";
import dropDownService from "../../services/common/DropDownService.js";
import updateService from "../../services/common/UpdateService.js";
import checkAssociateService from "../../services/common/checkAssociateService.js";
import PurchaseModel from "../../models/purchase/purchaseModel.js";
import deleteService from "../../services/common/deleteService.js";


export const CreateSuppliers = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await createService(req.body, userEmail, SuppliersModel);

        return result.status === "fail" ? res.status(400).json(result) : res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({status: "fail", message: err.message});
    }
};

export const UpdateSuppliers = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userEmail = req.user;

        const result = await updateService(id, data, userEmail, SuppliersModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SuppliersList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const searchArray = ["name","phone","email","address"]; // তুমি চাইলে আরও field add করতে পারো

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, SuppliersModel);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SuppliersDropDown = async (req, res) => {
    try {
        const userEmail = req.user;
        const projection = {_id: 1, name: 1};

        const result = await dropDownService(userEmail, SuppliersModel, projection);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const DeleteSupplier = async (req, res) => {
    try {
        const id = req.params.id;
        const userEmail = req.user;
        const check = await checkAssociateService(
            id,
            userEmail,
            PurchaseModel,
            "supplierID"
        );
        if (check.status === "fail") {
            return res.status(400).json({status: "fail", message: "Supplier is already used in purchase"});
        }
        const result = await deleteService(id, userEmail, SupplierModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};