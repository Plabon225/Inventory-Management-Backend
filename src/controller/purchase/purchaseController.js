import parentModel from "../../models/purchase/purchaseModel.js";
import childModel from "../../models/purchase/purchaseProductModel.js";
import createParentChildService from "../../services/common/createParentChildService.js";
import listService from "../../services/common/ListService.js";
import deleteParentChildService from "../../services/common/deleteParentChildService.js";
import purchaseReportService from "../../services/report/purchaseReportService.js";
import purchaseSummaryService from "../../services/summary/purchaseSummaryService.js";

export const CreatePurchase = async (req, res) => {
    try {
        const userEmail = req.user; // ✅ MUST

        const data = {
            parent: req.body.parent,
            childs: req.body.childs
        };

        const result = await createParentChildService(
            data,
            userEmail,
            parentModel,
            childModel,
            "purchaseId"
        );

        return res.status(result.status === "fail" ? 400 : 201).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const PurchaseList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const joinStages = [
            {
                $lookup: {
                    from: "suppliers",
                    localField: "supplierID",
                    foreignField: "_id",
                    as: "supplier"
                }
            }
        ]
        const searchArray = ["note", "supplier.name", "supplier.address", "supplier.phone", "supplier.email"];

        const result = await listService(pageNo, perPage, searchKeyword, userEmail, searchArray, parentModel, joinStages);

        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

export const DeletePurchase = async (req, res) => {
    try {
        const userEmail = req.user;
        const parentId = req.params.id;

        const result = await deleteParentChildService(
            parentModel,
            childModel,
            parentId,
            "purchaseId",
            userEmail
        );
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const PurchaseReport = async (req, res) => {
    try {
        const userEmail = req.user;
        const { fromDate, toDate } = req.query;
        const result = await purchaseReportService(userEmail, fromDate, toDate);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const PurchaseSummary = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await purchaseSummaryService(userEmail);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};