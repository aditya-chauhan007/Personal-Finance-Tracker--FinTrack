import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, type: { type: String, enum: ["income", "expense"], required: true }, amount: { type: Number, required: true, min: 0 }, category: { type: String, required: true, trim: true }, description: { type: String, default: "", trim: true }, date: { type: Date, required: true }, paymentMode: { type: String, enum: ["UPI", "Cash", "Debit Card", "Credit Card", "Net Banking", "Cheque", "Wallet"], default: "UPI" }, frequency: { type: String, enum: ["daily", "weekly", "monthly", "one-time"], default: "one-time" }, createdAt: { type: Date, default: Date.now } });
export default mongoose.model("Transaction", transactionSchema);
