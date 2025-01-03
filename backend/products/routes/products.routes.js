"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const router = express_1.default.Router();
router.get('/getSingleProduct/:id', product_controller_1.getSingleProduct);
router.get('/getAllProducts', product_controller_1.getProducts);
router.post('/create', product_controller_1.createProduct);
router.put('/update/:id', product_controller_1.editProduct);
router.delete('/delete/:id', product_controller_1.deleteProduct);
exports.default = router;
