import CategoriesModel from "../../models/categories/categoriesModel.js";
import createService from "../../services/common/CreateService.js";
import listService from "../../services/common/ListService.js";
import dropDownService from "../../services/common/DropDownService.js";
import updateService from "../../services/common/UpdateService.js";
import checkAssociateService from "../../services/common/checkAssociateService.js";
import ProductModel from "../../models/products/productsModel.js";
import deleteService from "../../services/common/deleteService.js";
import detailsByIDService from "../../services/common/detailsByIDService.js";


export const CreateCategory  = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await createService(req.body, userEmail, CategoriesModel);

        return result.status === "fail" ? res.status(400).json(result) : res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({status: "fail", message: err.message});
    }
};

export const UpdateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userEmail = req.user;

        const result = await updateService(id, data, userEmail, CategoriesModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const CategoryList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const searchArray = ["name"]; // তুমি চাইলে আরও field add করতে পারো

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, CategoriesModel);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const CategoryDropDown = async (req, res) => {
    try {
        const userEmail = req.user;
        const projection = {_id: 1, name: 1};

        const result = await dropDownService(userEmail, CategoriesModel, projection);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const userEmail = req.user;
        const check = await checkAssociateService(
            id,
            userEmail,
            ProductModel,
            "categoryId"
        );
        if (check.status === "fail") {
            return res.status(400).json({status: "fail", message: "Category is already used in Product"});
        }
        const result = await deleteService(id, userEmail, CategoriesModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const CategoryDetailsByID = async (req, res) => {
    try {

        const id = req.params.id;
        const userEmail = req.user;

        const result = await detailsByIDService(
            id,
            userEmail,
            CategoriesModel
        );

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};