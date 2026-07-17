import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Budget from "./models/Budget.js";
import Transaction from "./models/Transaction.js";
import User from "./models/User.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(__dirname, ".env.production") });
dotenv.config({ path: resolve(__dirname, "../.env.production") });
dotenv.config({ path: resolve(__dirname, ".env") });

const DEMO_EMAIL = "demo@fintrack.com";
const DEMO_PASSWORD = "Demo@1234";
const DEMO_NAME = "Demo User";
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI or MONGODB_URI is required to seed demo data.");
}

if (!mongoUri.includes("mongodb+srv://") || !mongoUri.includes("adityach2910_db_user")) {
  throw new Error("Refusing to seed: MongoDB URI does not match the production Atlas connection for adityach2910_db_user.");
}

const categories = ["Food", "Rent", "Transport", "Health", "Entertainment", "Shopping", "Utilities", "Others", "EMI", "SIP / Mutual Funds", "Insurance", "Petrol / CNG", "Mobile Recharge", "DTH / OTT", "Medical / Pharmacy", "Education / Tuition", "Groceries", "Zomato / Swiggy", "Electricity Bill", "Water Bill", "Home Loan", "Salary", "Freelance", "Business", "Investments"];
const paymentModes = ["UPI", "Cash", "Debit Card", "Credit Card", "Net Banking", "Cheque", "Wallet"];

const monthlyPlans = [
  { salary: 32000, extra: null, rent: 9200, food: 2600, groceries: 3800, transport: 2100, electricity: 1350, shopping: 2400, entertainment: 1200, mobile: 699, medical: 850, investment: 3000, other: 900 },
  { salary: 35000, extra: { type: "Freelance", amount: 6500, description: "Freelance landing page payment", mode: "UPI", day: 18 }, rent: 9400, food: 3000, groceries: 4100, transport: 2200, electricity: 1480, shopping: 2800, entertainment: 1600, mobile: 699, medical: 500, investment: 4000, other: 1200 },
  { salary: 38000, extra: { type: "Business", amount: 8500, description: "Small business consulting income", mode: "Net Banking", day: 22 }, rent: 9600, food: 3200, groceries: 4300, transport: 2500, electricity: 1650, shopping: 3600, entertainment: 1800, mobile: 799, medical: 1200, insurance: 2200, investment: 4500, other: 1000 },
  { salary: 36500, extra: null, rent: 9800, food: 2900, groceries: 3900, transport: 2300, electricity: 1720, shopping: 2100, entertainment: 1400, mobile: 699, dth: 499, medical: 700, investment: 3500, other: 950 },
  { salary: 42000, extra: { type: "Freelance", amount: 12000, description: "Freelance web project payment", mode: "UPI", day: 20 }, rent: 10000, food: 3400, groceries: 4600, transport: 2700, electricity: 1850, shopping: 4200, entertainment: 2100, mobile: 799, medical: 900, education: 1800, investment: 6000, other: 1300 },
  { salary: 40000, extra: { type: "Business", amount: 7000, description: "Business referral payout", mode: "Net Banking", day: 12 }, rent: 10000, food: 3100, groceries: 4400, transport: 2400, electricity: 1600, shopping: 2600, entertainment: 1500, mobile: 799, medical: 750, investment: 5000, water: 500, other: 900 }
];

const budgetLimits = {
  Food: 6500,
  Rent: 11000,
  Transport: 3500,
  Health: 2500,
  Entertainment: 2500,
  Shopping: 4500,
  Utilities: 2500,
  Others: 1800,
  EMI: 7000,
  "Petrol / CNG": 3000,
  "Medical / Pharmacy": 2200,
  Groceries: 5200,
  "Electricity Bill": 2200
};

function dateInMonth(baseDate, day) {
  const lastDay = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();
  const today = new Date();
  const maxDay = baseDate.getFullYear() === today.getFullYear() && baseDate.getMonth() === today.getMonth() ? today.getDate() : lastDay;
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), Math.min(day, maxDay), 12, 0, 0);
}

function monthLabel(date) {
  return date.toLocaleString("en-IN", { month: "long" });
}

function tx(userId, baseDate, day, type, category, amount, description, paymentMode) {
  if (!categories.includes(category)) throw new Error(`Unknown category: ${category}`);
  if (!paymentModes.includes(paymentMode)) throw new Error(`Unknown payment mode: ${paymentMode}`);
  return { userId, type, category, amount, description, paymentMode, date: dateInMonth(baseDate, day), createdAt: dateInMonth(baseDate, day) };
}

function buildTransactions(userId) {
  const now = new Date();
  return monthlyPlans.flatMap((plan, index) => {
    const baseDate = new Date(now.getFullYear(), now.getMonth() - (monthlyPlans.length - 1 - index), 1);
    const month = monthLabel(baseDate);
    const rows = [
      tx(userId, baseDate, 1, "income", "Salary", plan.salary, `Salary - ${month}`, "Net Banking"),
      tx(userId, baseDate, 2, "expense", "Rent", plan.rent, `Rent - ${month}`, "Net Banking"),
      tx(userId, baseDate, 3, "expense", "Groceries", plan.groceries, "Monthly grocery shopping", "Debit Card"),
      tx(userId, baseDate, 5, "expense", "Food", plan.food, "Office lunches and snacks", "UPI"),
      tx(userId, baseDate, 7, "expense", "Transport", plan.transport, "Metro pass and cab rides", "UPI"),
      tx(userId, baseDate, 9, "expense", "Electricity Bill", plan.electricity, `Electricity Bill - ${month}`, "UPI"),
      tx(userId, baseDate, 10, "expense", "Mobile Recharge", plan.mobile, "Mobile recharge", "Wallet"),
      tx(userId, baseDate, 13, "expense", "Shopping", plan.shopping, "Clothes and household items", "Credit Card"),
      tx(userId, baseDate, 15, "expense", "Entertainment", plan.entertainment, "Movie night and streaming", "Credit Card"),
      tx(userId, baseDate, 17, "expense", "Medical / Pharmacy", plan.medical, "Medicines and pharmacy", "UPI"),
      tx(userId, baseDate, 21, "expense", "SIP / Mutual Funds", plan.investment, "Monthly SIP investment", "Net Banking"),
      tx(userId, baseDate, 24, "expense", "Others", plan.other, "Miscellaneous household expense", "Cash")
    ];

    if (plan.extra) rows.push(tx(userId, baseDate, plan.extra.day, "income", plan.extra.type, plan.extra.amount, plan.extra.description, plan.extra.mode));
    if (plan.insurance) rows.push(tx(userId, baseDate, 11, "expense", "Insurance", plan.insurance, "Health insurance premium", "Net Banking"));
    if (plan.dth) rows.push(tx(userId, baseDate, 14, "expense", "DTH / OTT", plan.dth, "OTT subscription renewal", "Wallet"));
    if (plan.education) rows.push(tx(userId, baseDate, 16, "expense", "Education / Tuition", plan.education, "Online course fee", "Debit Card"));
    if (plan.water) rows.push(tx(userId, baseDate, 8, "expense", "Water Bill", plan.water, `Water Bill - ${month}`, "UPI"));

    return rows;
  });
}

async function seed() {
  await mongoose.connect(mongoUri);

  const password = await bcrypt.hash(DEMO_PASSWORD, 12);
  const user = await User.findOneAndUpdate(
    { email: DEMO_EMAIL },
    { $set: { fullName: DEMO_NAME, email: DEMO_EMAIL, password, currency: "INR", language: "en" }, $setOnInsert: { createdAt: new Date() } },
    { new: true, upsert: true, runValidators: true }
  );

  await Promise.all([
    Transaction.deleteMany({ userId: user._id }),
    Budget.deleteMany({ userId: user._id })
  ]);

  const transactions = buildTransactions(user._id);
  const today = new Date();
  const budgets = Object.entries(budgetLimits).map(([category, limit]) => ({
    userId: user._id,
    category,
    limit,
    month: today.getMonth() + 1,
    year: today.getFullYear()
  }));

  await Transaction.insertMany(transactions);
  await Budget.insertMany(budgets);

  const [userExists, transactionCount, budgetCount] = await Promise.all([
    User.exists({ email: DEMO_EMAIL }),
    Transaction.countDocuments({ userId: user._id }),
    Budget.countDocuments({ userId: user._id })
  ]);

  console.log("Demo seed completed successfully.");
  console.log(`User: ${DEMO_EMAIL} (${userExists ? "confirmed" : "missing"})`);
  console.log(`Transactions inserted: ${transactionCount}`);
  console.log(`Budgets inserted: ${budgetCount}`);
  console.log("Login password: Demo@1234");

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Demo seed failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
