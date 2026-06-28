import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ fullName: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true }, currency: { type: String, default: "INR", enum: ["INR", "USD", "EUR"] }, language: { type: String, default: "hi" }, createdAt: { type: Date, default: Date.now } });
export default mongoose.model("User", userSchema);
