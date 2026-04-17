import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false, timestamps: true });

CategorySchema.index({ userEmail: 1, name: 1 }, { unique: true });

const CategoriesModel = mongoose.model("categories", CategorySchema);

export default CategoriesModel;