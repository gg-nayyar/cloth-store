"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.GATEWAY_URI, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/', products_routes_1.default);
app.use('/order', order_routes_1.default);
exports.default = app;
