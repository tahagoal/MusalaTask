import express from "express";
import cors from 'cors';

import connectDB from "../config/database";
import device from "./routes/api/device";
import gateway from "./routes/api/gateway";

const app = express();

// Connect to MongoDB
connectDB();

// CORS Origin allowed localhost
app.use(cors());
app.options('*', cors());

// Express configuration
app.set("port", process.env.PORT || 5050);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/devices", device);
app.use("/api/gateways", gateway);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
