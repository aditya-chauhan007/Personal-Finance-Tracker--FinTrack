import dotenv from "dotenv";
import mongoose from "mongoose";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import User from "./models/User.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env.production") });
dotenv.config({ path: resolve(__dirname, "../.env.production") });
dotenv.config({ path: resolve(__dirname, ".env") });

const email = process.argv[2]?.trim().toLowerCase();
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!email) {
  console.error("Usage: node server/makeAdmin.js <email>");
  process.exit(1);
}

if (!mongoUri) {
  console.error("MONGO_URI or MONGODB_URI is required.");
  process.exit(1);
}

try {
  await mongoose.connect(mongoUri);
  const user = await User.findOneAndUpdate({ email }, { role: "admin" }, { new: true, runValidators: true }).select("fullName email role");
  if (!user) {
    console.error(`No user found for ${email}`);
    process.exitCode = 1;
  } else {
    console.log(`${user.email} is now ${user.role}.`);
  }
} catch (error) {
  console.error("Unable to promote admin:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect().catch(() => {});
}
