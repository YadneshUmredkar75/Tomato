
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';
import foodRouter from './routes/foodroute.js';
import userRout from './routes/userroute.js';
import 'dotenv/config'

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Serve static files
app.use("/images", express.static(join(__dirname, 'uploads')));

// DB connection
connectDB();

// API routes
app.use("/api/food", foodRouter);
app.use("/api/user",userRout)
// Default route
app.get("/", (req, res) => {
  res.send("APIs working");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});