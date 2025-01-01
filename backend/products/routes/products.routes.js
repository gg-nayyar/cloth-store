"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const router = express_1.default.Router();
router.get('/products/getSingleProduct/:id', product_controller_1.getSingleProduct);
router.get('/products/getAllProducts', product_controller_1.getProducts);
router.post('/products/create', product_controller_1.createProduct);
router.put('/products/update/:id', product_controller_1.editProduct);
router.delete('/products/delete/:id', product_controller_1.deleteProduct);
exports.default = router;
