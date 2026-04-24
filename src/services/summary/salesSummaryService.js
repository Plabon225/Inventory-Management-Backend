import salesModel from "../../models/sales/salesModel.js";

const salesSummaryService = async (userEmail) => {
    try {
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const data = await salesModel.aggregate([
            {
                $match: {
                    userEmail,
                    salesDate: { $gte: last30Days, $lte: today }
                }
            },
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: null,
                                TotalAmount: { $sum: "$grandTotal"},
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
                                TotalAmount: { $sum: "$grandTotal" }
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

export default salesSummaryService;