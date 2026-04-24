import mongoose from "mongoose";

const SalesReturnProductSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    returnId: {type: mongoose.Schema.Types.ObjectId, ref: "sales_returns", required: true, index: true},
    salesProductId: {type: mongoose.Schema.Types.ObjectId, ref: "sales_products", required: true},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true},
    quantity: {type: Number, required: true},
    unitPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true}

}, { versionKey: false, timestamps: true });

const SalesReturnProductModel = mongoose.model("sales_return_products", SalesReturnProductSchema);

export default SalesReturnProductModel;