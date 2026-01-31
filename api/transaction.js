import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(MONGO_URL);
  isConnected = true;
}

const TransactionSchema = new mongoose.Schema(
  {
    amount: Number,
    type: String,
    category: String,
    division: String
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const data = await Transaction.find().sort({ createdAt: -1 });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const saved = await Transaction.create(req.body);
    return res.status(201).json(saved);
  }

  res.status(405).json({ error: "Method not allowed" });
}
