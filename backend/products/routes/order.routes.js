"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const router = express_1.default.Router();
router.get("/order/getAllOrders", order_controller_1.getAllOrders);
router.get("/order/getSingleOrder/:id", order_controller_1.getSingleOrder);
router.post("/order/createOrder", order_controller_1.createOrder);
router.delete("/order/deleteOrder/:id", order_controller_1.deleteOrder);
exports.default = router;
