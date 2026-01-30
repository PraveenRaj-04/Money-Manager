const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  res.json(data);
});

// POST
router.post("/", async (req, res) => {
  const tx = new Transaction(req.body);
  await tx.save();
  res.status(201).json(tx);
});

// UPDATE (12 hours)
router.put("/:id", async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  const hours = (Date.now() - tx.createdAt) / (1000 * 60 * 60);

  if (hours > 12) {
    return res.status(403).json({ message: "Edit time expired" });
  }

  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// DELETE (12 hours)
router.delete("/:id", async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  const hours = (Date.now() - tx.createdAt) / (1000 * 60 * 60);

  if (hours > 12) {
    return res.status(403).json({ message: "Delete time expired" });
  }

  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
