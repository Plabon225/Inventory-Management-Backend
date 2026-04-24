import mongoose from "mongoose";

const SalesProductSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    salesId: { type: mongoose.Schema.Types.ObjectId, ref: "sales", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }

}, { versionKey: false, timestamps: true });

const SalesProductModel = mongoose.model("sales_products", SalesProductSchema);
export default SalesProductModel;