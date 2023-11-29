import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
  .then(() => {
    console.log("Database Connected: ", mongoose.connection.host, mongoose.connection.name);
  })
  .catch((error) => console.error(error.message));

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/", postRoutes);
app.use("/user", userRoutes);
app.use("/contact", contactRoutes);

// static files
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", function (req, res) {
  const indexPath = path.resolve(__dirname, "../client/dist/index.html");
  res.sendFile(indexPath);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on Port: http://localhost:${PORT}`);
});
