import express from "express";

import { login, register, addToWishlist, addToCart } from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/wishlist").post(auth, addToWishlist);
router.route("/cart").post(auth, addToCart);

export default router;