import express from "express";
import { fetchCartItems, addToCart, removeFromCart, removeAllFromCart, updateCartItem } from "../controller/cartController.js";

const router = express.Router();

router.route("/:userId/cart").get(fetchCartItems);
router.route("/:userId/cart/add").post(addToCart);
router.route("/:userId/cart/update").patch(updateCartItem)
router.route("/:userId/cart/:productId").delete(removeFromCart);
router.route("/:userId/cart/remove-all").delete(removeAllFromCart);

export default router;
