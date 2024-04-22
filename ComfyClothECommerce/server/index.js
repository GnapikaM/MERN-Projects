import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./database/connectDB.js";
import userRoutes from "./routes/UserRoutes.js";
import wishlistRoutes from "./routes/WishlistRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use("/user", userRoutes);
app.use("/user", wishlistRoutes);
app.use("/", ProductRoutes);

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", function (req, res) {
  const indexPath = path.resolve(__dirname, "../client/dist/index.html");
  res.sendFile(indexPath);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
