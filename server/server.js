const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== HEALTH CHECK ROUTE =====
app.get("/", (req, res) => {
  res.send("Money Manager API is running");
});

// ===== ROUTES =====
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

// ===== PORT (REQUIRED FOR RENDER) =====
const PORT = process.env.PORT || 5000;

// ===== START SERVER FUNCTION =====
async function startServer() {
  try {
    // 🔴 THIS IS WHERE THE CODE GOES
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

// ===== CALL FUNCTION =====
startServer();
