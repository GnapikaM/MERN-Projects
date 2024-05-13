import express from "express";

import { createOrder, getAllOrders } from "../controller/orderController.js";

const router = express.Router();

router.route("/:customerId/orders/get").get(getAllOrders);
router.route("/:userId/orders/add").post(createOrder);

export default router;