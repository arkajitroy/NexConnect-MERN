import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./api/routes/AuthRoutes.routes.js";

// constants
dotenv.config();
const app = express();
const PORT = process.env.LOCAL_SERVER_PORT;

// Middleware: Body parsing (for JSON and form data)
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Routes
app.use("/api/auth", AuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
