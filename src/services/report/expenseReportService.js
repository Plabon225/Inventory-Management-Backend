import ExpenseModel from "../../models/expenses/expenseModel.js";

const expenseReportService = async (userEmail, fromDate, toDate) => {
    try {
        const matchStage = {
            userEmail
        };
        if (fromDate && toDate) {
            matchStage.createdAt = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }
        const result = await ExpenseModel.aggregate([
            {
                $match: matchStage
            },
            {
                $facet: {
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: "$amount" },
                                totalCount: { $sum: 1 },
                                avgAmount: { $avg: "$amount" }
                            }
                        }
                    ],
                    rows: [
                        {$lookup: {from: "expensetypes", localField: "typeId", foreignField: "_id", as: "type"}},
                        {$unwind: {path: "$type", preserveNullAndEmptyArrays: true}},
                        {
                            $project: {
                                amount: 1,
                                note: 1,
                                createdAt: 1,
                                type: {
                                    _id: "$type._id",
                                    name: "$type.name",
                                    createdAt: "$type.createdAt"
                                }
                            }
                        },
                        {
                            $sort: { createdAt: -1 }
                        }
                    ]
                }
            }
        ]);
        return {status: "success", data: result[0]};
    } catch (error) {
        return {status: "fail", message: error.message};
    }
};

export default expenseReportService;