import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

// Safety check
if (!MONGO_URL) {
  throw new Error("MONGO_URL environment variable is missing");
}

// Prevent multiple connections
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Schema (safe re-use)
const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, default: "General" },
    division: { type: String, default: "Personal" },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const data = await Transaction.find().sort({ createdAt: -1 });
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const saved = await Transaction.create(req.body);
      return res.status(201).json(saved);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
