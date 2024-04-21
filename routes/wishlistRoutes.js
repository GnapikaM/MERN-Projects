import express from "express";
import {
  addProductToWishlist,
  fetchProductsFromWishlist,
  removeProductFromWishlist,
} from "../controller/wishlistController.js";

const router = express.Router();

router.route("/").post(addProductToWishlist);
router.route("/:userId").get(fetchProductsFromWishlist);
router.route("/:itemId").delete(removeProductFromWishlist);

export default router;
