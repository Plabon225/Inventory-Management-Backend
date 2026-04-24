import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true, index: true },
    invoiceNo: { type: String, required: true, unique: true, trim: true },
    subTotal: { type: Number, default: 0 },
    vatTax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    otherCost: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },
    paymentStatus: {type: String, enum: ["paid", "partial", "due"], default: "due"},
    salesDate: { type: Date, default: Date.now },
    status: {type: String, enum: ["active", "cancelled", "returned"], default: "active"},
    note: { type: String, default: "" }

}, { versionKey: false, timestamps: true });

const SalesModel = mongoose.model("sales", SalesSchema);
export default SalesModel;