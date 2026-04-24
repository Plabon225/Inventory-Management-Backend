import ProductsModel from "../../models/products/productsModel.js";
import createService from "../../services/common/CreateService.js";
import updateService from "../../services/common/UpdateService.js";
import listService from "../../services/common/ListService.js";
import checkAssociateService from "../../services/common/checkAssociateService.js";
import PurchaseProductModel from "../../models/purchase/purchaseProductModel.js";
import SalesReturnProductModel from "../../models/returns/SalesReturnProductModel.js";
import SalesProductModel from "../../models/sales/salesProductModel.js";
import deleteService from "../../services/common/deleteService.js";

export const CreateProducts = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await createService(req.body, userEmail, ProductsModel);

        return result.status === "fail" ? res.status(400).json(result) : res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({status: "fail", message: err.message});
    }
};

export const UpdateProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userEmail = req.user;

        const result = await updateService(id, data, userEmail, ProductsModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const ProductList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const joinStages = [
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            }
        ];

        const searchArray = ["note", "unit", "details", "category.name", "brand.name"];

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, ProductsModel, joinStages);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


export const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const userEmail = req.user;
        const purchaseCheck = await checkAssociateService(
            id,
            userEmail,
            PurchaseProductModel,
            "productId"
        );
        if (purchaseCheck.status === "fail") {
            return res.status(400).json({status: "fail", message: "Product is already used in purchase"});
        }
        const salesCheck = await checkAssociateService(
            id,
            userEmail,
            SalesProductModel,
            "productId"
        );
        if (salesCheck.status === "fail") {
            return res.status(400).json({status: "fail", message: "Product is already used in sales"});
        }
        const returnCheck = await checkAssociateService(
            id,
            userEmail,
            SalesReturnProductModel,
            "productId"
        );
        if (returnCheck.status === "fail") {
            return res.status(400).json({status: "fail", message: "Product is already used in sales return"});
        }

        const result = await deleteService(id, userEmail, ProductsModel);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};