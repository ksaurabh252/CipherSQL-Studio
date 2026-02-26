const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
require("dotenv").config();
const sqlRoutes = require("./src/routes/sqlRoutes");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/sql", sqlRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
