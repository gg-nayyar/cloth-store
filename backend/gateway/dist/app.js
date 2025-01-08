"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('/api/user', (0, express_http_proxy_1.default)('http://localhost:8001'));
app.use('/api/products', (0, express_http_proxy_1.default)('http://localhost:8002'));
app.listen(process.env.GATEWAY_PORT, () => {
    console.log(`Connected on port ${process.env.GATEWAY_PORT}`);
});
