import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    address: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false, timestamps: true });

SupplierSchema.index({ userEmail: 1, phone: 1 }, { unique: true });

const SuppliersModel = mongoose.model("suppliers", SupplierSchema);

export default SuppliersModel;