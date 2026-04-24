import mongoose from "mongoose";

const PurchaseProductSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    purchaseId: {type: mongoose.Schema.Types.ObjectId, ref: "purchases", required: true, index: true},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true, index: true},
    quantity: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }

}, { versionKey: false, timestamps: true });

export default mongoose.model("purchase_products", PurchaseProductSchema);