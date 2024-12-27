require('dotenv').config(); // Load environment variables

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const userRoutes = require("./Routes/userroutes"); // Import the user routes


const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection from environment variables
const MONGO_URI = process.env.MONGO_URI; // Use MONGO_URI from .env file

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use the user routes
app.use("/api/users", userRoutes);




const PORT = process.env.PORT || 5000; // Use PORT from environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
