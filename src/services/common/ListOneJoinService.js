// const ListOneJoinService = async (pageNo, perPage, searchKeyword, userEmail, searchArray, dataModel, joinStage) => {
//     try {
//         const skipRow = (pageNo - 1) * perPage;
//         let searchQuery = {};
//         if (searchKeyword !== "0") {
//             const isNumber = !isNaN(searchKeyword);
//             searchQuery = {
//                 $or: searchArray.map(field => {
//
//                     if (field === "amount" && isNumber) {
//                         return {
//                             amount: Number(searchKeyword)
//                         };
//                     }
//
//                     return {
//                         [field]: { $regex: searchKeyword, $options: "i" }
//                     };
//                 })
//             };
//         }
//
//         const data = await dataModel.aggregate([
//             { $match: { userEmail: userEmail } },
//             joinStage,
//             { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },
//             ...(searchKeyword !== "0" ? [{ $match: searchQuery }] : []),
//             {
//                 $facet: {
//                     Total: [{ $count: "count" }],
//                     Rows: [
//                         { $skip: skipRow },
//                         { $limit: perPage }
//                     ]
//                 }
//             }
//         ]);
//
//         return {status: "success", total: data?.[0]?.Total?.[0]?.count || 0, data: data?.[0]?.Rows || []};
//
//     } catch (error) {
//         return {status: "fail", message: error.message};
//     }
// };
//
// export default ListOneJoinService;



const ListJoinService = async (
    pageNo,
    perPage,
    searchKeyword,
    userEmail,
    searchArray,
    dataModel,
    joinStages = [],
    numberFields = []
) => {
    try {

        const skipRow = (pageNo - 1) * perPage;
        const isNumber = !isNaN(searchKeyword);

        let searchQuery = {};

        if (searchKeyword !== "0") {
            searchQuery = {
                $or: searchArray.map(field =>
                    numberFields.includes(field) && isNumber
                        ? { amount: Number(searchKeyword) }
                        : { [field]: { $regex: searchKeyword, $options: "i" } }
                )
            };
        }

        const pipeline = [

            // 🔹 user filter
            { $match: { userEmail: userEmail } },

            // 🔹 multiple lookup
            ...joinStages,

            // 🔹 dynamic unwind
            ...joinStages.map(stage => ({
                $unwind: {
                    path: `$${stage.$lookup.as}`,
                    preserveNullAndEmptyArrays: true
                }
            })),

            // 🔹 search
            ...(searchKeyword !== "0" ? [{ $match: searchQuery }] : []),

            // 🔹 pagination
            {
                $facet: {
                    Total: [{ $count: "count" }],
                    Rows: [
                        { $skip: skipRow },
                        { $limit: perPage }
                    ]
                }
            }
        ];

        const data = await dataModel.aggregate(pipeline);

        return {
            status: "success",
            total: data?.[0]?.Total?.[0]?.count || 0,
            data: data?.[0]?.Rows || []
        };

    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

export default ListJoinService;