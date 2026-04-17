import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "brands", required: true },
    name: { type: String, required: true, trim: true, lowercase: true },
    // price: { type: Number, required: true },
    // stock: { type: Number, default: 0 },
    unit: { type: String, default: "pcs" },
    description: { type: String, default: "" },
    details: { type: String},
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdDate: { type: Date, default: Date.now }

}, { versionKey: false, timestamps: true });


// 🔥 Compound Index (duplicate product prevent per user)
ProductSchema.index({ userEmail: 1, name: 1 }, { unique: true });


const ProductsModel = mongoose.model("products", ProductSchema);

export default ProductsModel;