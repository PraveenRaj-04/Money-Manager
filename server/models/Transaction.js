const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    category: {
      type: String,
      default: "General"
    },
    division: {
      type: String,
      enum: ["Personal", "Office"],
      default: "Personal"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
