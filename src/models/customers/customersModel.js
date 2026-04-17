import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    address: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false, timestamps: true });

CustomerSchema.index({ userEmail: 1, phone: 1 }, { unique: true });

const CustomersModel = mongoose.model("customers", CustomerSchema);

export default CustomersModel;