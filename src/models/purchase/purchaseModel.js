import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    userEmail: {type: String, required: true, index: true},
    supplierID: {type: mongoose.Schema.Types.ObjectId, ref: "suppliers", required: true, index: true},
    invoiceNo: {type: String, required: true, unique: true, trim: true, index: true},
    subTotal: {type: Number, default: 0},
    vatTax: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    shippingCost: {type: Number, default: 0},
    otherCost: {type: Number, default: 0},
    grandTotal: {type: Number, default: 0},
    paidAmount: {type: Number, default: 0},
    dueAmount: {type: Number, default: 0},
    paymentStatus: {type: String, enum: ["paid", "partial", "due"], default: "due", index: true},
    paymentMethod: {type: String, enum: ["cash", "bank", "mobile_banking", "cheque", "other"], default: "cash"},
    status: {type: String, enum: ["active", "cancelled", "returned"], default: "active", index: true},
    note: {type: String, default: ""},
    purchaseDate: {type: Date, default: Date.now, index: true}

}, {versionKey: false, timestamps: true});

const PurchaseModel = mongoose.model("purchases", PurchaseSchema);

export default PurchaseModel;