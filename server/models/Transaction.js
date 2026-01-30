const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  division: {
    type: String,
    enum: ["Personal", "Office"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
