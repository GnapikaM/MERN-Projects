import express from "express";
import { fetchWishlistItems, addToWishlist, removeFromWishlist } from "../controller/wishlistController.js";

const router = express.Router();

router.route("/:userId/wishlist").get(fetchWishlistItems);
router.route("/:userId/wishlist/add").post(addToWishlist);
router.route("/:userId/wishlist/:productId").delete(removeFromWishlist);

export default router;
