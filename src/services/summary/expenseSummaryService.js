import expenseModel from "../../models/expenses/expenseModel.js";

const expenseSummaryService = async (userEmail) => {
    try {
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const data = await expenseModel.aggregate([
            {
                $match: {
                    userEmail,
                    expenseDate: { $gte: last30Days, $lte: today }
                }
            },
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: null,
                                TotalAmount: { $sum: "$amount" },
                                TotalCount: { $sum: 1 }
                            }
                        }
                    ],
                    Last30Days: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: {
                                        format: "%Y-%m-%d",
                                        date: "$expenseDate"
                                    }
                                },
                                TotalAmount: { $sum: "$amount" }
                            }
                        },
                        {
                            $sort: { _id: 1 }
                        }
                    ]
                }
            }
        ]);
        return {status: "success", data: data[0] || { Total: [], Last30Days: [] }};

    } catch (err) {
        return {status: "fail", message: err.message};
    }
};

export default expenseSummaryService;