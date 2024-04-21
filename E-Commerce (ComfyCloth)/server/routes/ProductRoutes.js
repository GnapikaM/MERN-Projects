import express from "express";
import { fetchAllProducts } from "../controller/productController.js";

const router = express.Router();

router.route("/").get(fetchAllProducts);

export default router;
