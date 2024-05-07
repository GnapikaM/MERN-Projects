import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Server } from "socket.io";
import http from "http";

import connectDB from "./database/connectDB.js";
import userRoutes from "./routes/UserRoutes.js";
import wishlistRoutes from "./routes/WishlistRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import AddressRoutes from "./routes/AddressRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js";
import ReviewRoutes from "./routes/ReviewRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/user", wishlistRoutes);
app.use("/user", cartRoutes);
app.use("/", ProductRoutes);
app.use("/contact", ContactRoutes);
app.use("/addresses", AddressRoutes);
app.use("/", OrderRoutes);
app.use("/products", ReviewRoutes);

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

io.on("connection", (socket) => {
  console.log("A client connected");

  ReviewModel.watch().on("change", (change) => {
    if (change.operationType === "update") {
      const updatedReview = change.fullDocument;
      const { likeCount, dislikeCount } = updatedReview;
      io.emit("reviewCountUpdated", { likeCount, dislikeCount });
    }
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});

