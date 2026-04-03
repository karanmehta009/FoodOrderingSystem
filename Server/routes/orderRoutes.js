import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { createOrderFromCart } from "../controllers/orderController.js";

const router = express.Router();

//Create Order

router.post("/create", protect, createOrder);

router.post("/create-from-cart", protect, createOrderFromCart)
//Get Logged-in User Orders

router.get ("/my-orders", protect,  getUserOrders);

//Admin Get all users Orders
router.get("/all", protect, adminMiddleware, getAllOrders);

//admin Update status

router.put("/status/:id", protect, adminMiddleware, updateOrderStatus);

export default router;
