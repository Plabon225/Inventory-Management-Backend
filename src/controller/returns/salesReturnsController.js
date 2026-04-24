import createParentChildService from "../../services/common/createParentChildService.js";
import parentModel from "../../models/returns/SalesReturnModel.js";
import childModel from "../../models/returns/SalesReturnProductModel.js";
import listService from "../../services/common/ListService.js";
import deleteParentChildService from "../../services/common/deleteParentChildService.js";
import ReturnReportService from "../../services/report/returnReportService.js";
import returnSummaryService from "../../services/summary/returnSummaryService.js";

export const CreateSalesReturn = async (req, res) => {
    try {
        const userEmail = req.user;
        const data = {
            parent: req.body.parent,
            childs: req.body.childs
        };
        const result = await createParentChildService(
            data,
            userEmail,
            parentModel,
            childModel,
            "returnId"
        );
        return res.status(result.status === "fail" ? 400 : 201).json(result);
    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SalesReturnList = async (req, res) => {
    try {
        const pageNo = Number(req.query.pageNo) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const searchKeyword = req.query.searchKeyword || "0";
        const userEmail = req.user;

        const joinStages = [
            {
                $lookup: {
                    from: "sales",
                    localField: "salesId",
                    foreignField: "_id",
                    as: "sales"
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customerID",
                    foreignField: "_id",
                    as: "customer"
                }
            }
        ]
        const searchArray = ["note","returnInvoiceNo", "customer.name", "customer.address", "customer.phone", "customer.email", "sales.invoiceNo"];

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

export const DeleteSalesReturn = async (req, res) => {
    try {
        const userEmail = req.user;
        const parentId = req.params.id;

        const result = await deleteParentChildService(
            parentModel,
            childModel,
            parentId,
            "returnId",
            userEmail
        );
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SalesReturnReport = async (req, res) => {
    try {
        const userEmail = req.user;
        const { fromDate, toDate } = req.query;
        const result = await ReturnReportService(userEmail, fromDate, toDate);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};

export const SalesReturnSummary = async (req, res) => {
    try {
        const userEmail = req.user;
        const result = await returnSummaryService(userEmail);
        const statusCode = result.status === "fail" ? 400 : 200;
        return res.status(statusCode).json(result);

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};