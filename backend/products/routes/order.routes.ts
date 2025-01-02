import express from "express";
import { createOrder,getAllOrders, getSingleOrder,createPaymentIntent, deleteOrder } from "../controller/order.controller";

const router = express.Router();

router.get("/getAllOrders",getAllOrders);
router.get("/getSingleOrder/:id",getSingleOrder);
router.post("/createOrder",createOrder);
router.post("/create-payment-intent", createPaymentIntent);
router.delete("/deleteOrder/:id",deleteOrder);

export default router;