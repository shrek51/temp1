const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const XLSX = require("xlsx");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/shift-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/teams", (req, res) => {
  // Read Excel file (create a 'data.xlsx' file in backend folder first)
  const workbook = XLSX.readFile("data.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);
  res.json(data);
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
