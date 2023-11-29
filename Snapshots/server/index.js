import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./database/connectDB.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

connectDB();

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/", postRoutes);
app.use("/user", userRoutes);
app.use("/contact", contactRoutes);

//static files
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on Port: http://localhost:${PORT}`);
});
