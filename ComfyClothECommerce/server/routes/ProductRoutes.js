import express from "express";
import { fetchAllProducts, updateRating } from "../controller/productController.js";

const router = express.Router();

router.route("/").get(fetchAllProducts);
router.route("/:productId/rating").put(updateRating);

export default router;
