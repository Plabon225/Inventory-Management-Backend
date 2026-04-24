import createParentChildService from "../../services/common/createParentChildService.js";
import parentModel from "../../models/sales/salesModel.js";
import childModel from "../../models/sales/salesProductModel.js";
import listService from "../../services/common/ListService.js";
import deleteParentChildService from "../../services/common/deleteParentChildService.js";
import SalesReportService from "../../services/report/salesReportService.js";
import salesSummaryService from "../../services/summary/salesSummaryService.js";

export const CreateSales = async (req, res) => {
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
            "salesId"
        );
        return res.status(result.status === "fail" ? 400 : 201).json(result);
    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const salesList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const joinStages = [
            {
                $lookup: {
                    from: "customers",
                    localField: "customerID",
                    foreignField: "_id",
                    as: "customer"
                }
            }
        ]
        const searchArray = ["note","invoiceNo", "customer.name", "customer.address", "customer.phone", "customer.email"];

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

export const DeleteSales = async (req, res) => {
    try {
        const userEmail = req.user;
        const parentId = req.params.id;

        const result = await deleteParentChildService(
            parentModel,
            childModel,
            parentId,
            "salesId",
            userEmail
        );
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SalesReport = async (req, res) => {
    try {
        const userEmail = req.user;
        const { fromDate, toDate } = req.query;
        const result = await SalesReportService(userEmail, fromDate, toDate);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SalesSummary = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await salesSummaryService(userEmail);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};
