import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    typeId: { type: mongoose.Schema.Types.ObjectId, ref: "expenseTypes", required: true },
    amount: { type: Number, required: true },
    note: { type: String, default: "" },
    expenseDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "deleted"], default: "active" },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false, timestamps: true });

// Index for faster query
ExpenseSchema.index({ userEmail: 1, expenseDate: -1 });

const ExpenseModel = mongoose.model("expenses", ExpenseSchema);

export default ExpenseModel;