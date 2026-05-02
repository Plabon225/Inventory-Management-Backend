import mongoose from "mongoose";

const ExpenseTypeSchema = new mongoose.Schema({
        userEmail: {type: String, required: true, index: true},
        name: {type: String, required: true, trim: true, lowercase: true},
        description: {type: String, default: ""},
        status: {type: String, enum: ["active", "inactive"], default: "active"},
        createdDate: {type: Date, default: Date.now}
    }, {versionKey: false, timestamps: true}
);

ExpenseTypeSchema.index({ userEmail: 1, name: 1 }, { unique: true });

const ExpenseTypesModel = mongoose.model("expenseTypes", ExpenseTypeSchema);

export default ExpenseTypesModel;