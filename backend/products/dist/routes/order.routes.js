"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const admin_middleware_1 = __importDefault(require("../utils/admin.middleware"));
const router = express_1.default.Router();
router.get("/getAllOrders", admin_middleware_1.default, order_controller_1.getAllOrders);
router.get("/getSingleOrder/:id", admin_middleware_1.default, order_controller_1.getSingleOrder);
router.post("/createOrder", order_controller_1.createOrder);
router.post("/create-payment-intent", order_controller_1.createPaymentIntent);
router.delete("/deleteOrder/:id", admin_middleware_1.default, order_controller_1.deleteOrder);
exports.default = router;
