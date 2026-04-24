import mongoose from "mongoose";

const SalesReturnSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    salesId: {type: mongoose.Schema.Types.ObjectId, ref: "sales", required: true, index: true},
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true, index: true},
    returnInvoiceNo: {type: String, required: true, unique: true, trim: true, index: true},
    subTotal: { type: Number, default: 0 },
    totalReturnAmount: { type: Number, default: 0 },
    refundAmount: { type: Number, default: 0 },
    returnType: {type: String, enum: ["full", "partial"], default: "partial"},
    note: { type: String, default: "" },
    returnDate: {type: Date, default: Date.now, index: true},
    status: {type: String, enum: ["active", "cancelled"], default: "active", index: true}

}, { versionKey: false, timestamps: true });

const SalesReturnModel = mongoose.model("sales_returns", SalesReturnSchema);

export default SalesReturnModel;