import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import Stripe from "stripe";

import connectDB from "./database/connectDB.js";
import userRoutes from "./routes/UserRoutes.js";
import wishlistRoutes from "./routes/WishlistRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import AddressRoutes from "./routes/AddressRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ReviewRoutes from "./routes/ReviewRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const stripe = new Stripe(process.env.STRIPE_SECRET);

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Enable CORS for all routes
app.use(cors());

app.use("/user", userRoutes);
app.use("/user", wishlistRoutes);
app.use("/user", cartRoutes);
app.use("/", ProductRoutes);
app.use("/contact", ContactRoutes);
app.use("/addresses", AddressRoutes);
app.use("/", OrderRoutes);
app.use("/products", ReviewRoutes);

app.post("/create-payment-intent", async (req, res) => {
  const { amount, description, customerAddress } = req.body;
  console.log("create paymenet intent: ", customerAddress);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: description || "Payment description",
      shipping: {
        name: customerAddress.name,
        address: {
          line1: customerAddress.street,
          city: customerAddress.city,
          state: customerAddress.state,
          postal_code: customerAddress.zip,
          country: "US", // Specify the country
        },
        phone: customerAddress.phone,
      },
    });

    console.log("Payment Intent created:", paymentIntent);

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

const __dirname = path.resolve();
const parentDir = path.dirname(path.dirname(__dirname));
app.use(express.static(path.join(parentDir, "client", "dist")));

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
