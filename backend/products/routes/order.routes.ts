import express from "express";
import { createOrder,getAllOrders, getSingleOrder, deleteOrder } from "../controller/order.controller";

const router = express.Router();

router.get("/order/getAllOrders",getAllOrders);
router.get("/order/getSingleOrder/:id",getSingleOrder);
router.post("/order/createOrder",createOrder);
router.delete("/order/deleteOrder/:id",deleteOrder);

export default router;