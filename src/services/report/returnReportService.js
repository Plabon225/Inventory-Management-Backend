import SalesReturnProductModel from "../../models/returns/SalesReturnProductModel.js";

const purchaseReportService = async (userEmail, fromDate, toDate) => {
    try {
        const matchStage = { userEmail };
        if (fromDate && toDate) {
            matchStage.createdAt = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }
        const result = await SalesReturnProductModel.aggregate([
            {
                $match: matchStage
            },
            {
                $facet: {
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalPurchaseAmount: { $sum: "$totalPrice" },
                                totalQuantity: { $sum: "$quantity" },
                                totalItems: { $sum: 1 },
                                avgPurchase: { $avg: "$totalPrice" }
                            }
                        }
                    ],
                    rows: [
                        {$lookup: {from: "products", localField: "productId", foreignField: "_id", as: "product"}},
                        {$unwind: {path: "$product", preserveNullAndEmptyArrays: true}},

                        {
                            $addFields: {
                                brandId: "$product.brandId",
                                categoryId: "$product.categoryId"
                            }
                        },

                        {$lookup: {from: "brands", localField: "brandId", foreignField: "_id", as: "brand"}},
                        {$unwind: {path: "$brand", preserveNullAndEmptyArrays: true}},

                        {$lookup: {from: "categories", localField: "categoryId", foreignField: "_id", as: "category"}},
                        {$unwind: {path: "$category", preserveNullAndEmptyArrays: true}},

                        {
                            $project: {
                                quantity: 1,
                                unitCost: 1,
                                totalPrice: 1,
                                createdAt: 1,

                                product: {
                                    _id: "$product._id",
                                    name: "$product.name"
                                },
                                brand: {
                                    _id: "$brand._id",
                                    name: "$brand.name"
                                },
                                category: {
                                    _id: "$category._id",
                                    name: "$category.name"
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

export default purchaseReportService;