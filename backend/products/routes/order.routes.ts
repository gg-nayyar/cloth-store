import express from "express";
import { createOrder,getAllOrders, getSingleOrder,createPaymentIntent, deleteOrder } from "../controller/order.controller";
import isAdmin from "../utils/admin.middleware";

const router = express.Router();

router.get("/getAllOrders",isAdmin,getAllOrders);
router.get("/getSingleOrder/:id",isAdmin,getSingleOrder);
router.post("/createOrder",createOrder);
router.post("/create-payment-intent", createPaymentIntent);
router.delete("/deleteOrder/:id",isAdmin,deleteOrder);

export default router;