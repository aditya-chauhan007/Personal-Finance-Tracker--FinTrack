import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const userProjection = "fullName email role createdAt";

export const getAdminStats = async (req, res, next) => {
  try {
    const [totalUsers, totalTransactions, totals, userTotals] = await Promise.all([
      User.countDocuments(),
      Transaction.countDocuments(),
      Transaction.aggregate([{ $group: { _id: "$type", total: { $sum: "$amount" } } }]),
      Transaction.aggregate([{ $group: { _id: { userId: "$userId", type: "$type" }, total: { $sum: "$amount" } } }])
    ]);

    const totalIncome = totals.find((row) => row._id === "income")?.total || 0;
    const totalExpense = totals.find((row) => row._id === "expense")?.total || 0;
    const perUser = new Map();
    userTotals.forEach((row) => {
      const key = String(row._id.userId);
      const current = perUser.get(key) || { income: 0, expense: 0 };
      current[row._id.type] = row.total;
      perUser.set(key, current);
    });
    const savingsRates = [...perUser.values()].filter((row) => row.income > 0).map((row) => ((row.income - row.expense) / row.income) * 100);
    const averageSavingsRate = savingsRates.length ? savingsRates.reduce((total, rate) => total + rate, 0) / savingsRates.length : 0;

    res.json({ stats: { totalUsers, totalTransactions, totalIncome, totalExpense, averageSavingsRate } });
  } catch (error) {
    next(error);
  }
};

export const getAdminUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;
    const [users, total, counts] = await Promise.all([
      User.find().select(userProjection).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
      Transaction.aggregate([{ $group: { _id: "$userId", count: { $sum: 1 } } }])
    ]);
    const countMap = new Map(counts.map((row) => [String(row._id), row.count]));
    res.json({
      users: users.map((user) => ({ _id: user._id, fullName: user.fullName, email: user.email, role: user.role || "user", createdAt: user.createdAt, transactionCount: countMap.get(String(user._id)) || 0 })),
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminUserSummary = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(userProjection);
    if (!user) return res.status(404).json({ message: "User not found" });
    const [transactionCount, totals] = await Promise.all([
      Transaction.countDocuments({ userId: user._id }),
      Transaction.aggregate([{ $match: { userId: user._id } }, { $group: { _id: "$type", total: { $sum: "$amount" } } }])
    ]);
    const income = totals.find((row) => row._id === "income")?.total || 0;
    const expense = totals.find((row) => row._id === "expense")?.total || 0;
    res.json({ user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role || "user", createdAt: user.createdAt, transactionCount, totalBalance: income - expense } });
  } catch (error) {
    next(error);
  }
};

export const updateAdminUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) return res.status(400).json({ message: "Role must be user or admin" });
    if (String(req.params.id) === String(req.userId) && role !== "admin") return res.status(400).json({ message: "You cannot remove your own admin access" });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true }).select(userProjection);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role || "user", createdAt: user.createdAt } });
  } catch (error) {
    next(error);
  }
};
