import express from "express";
import { createProduct, getProducts, editProduct, getSingleProduct, deleteProduct } from "../controller/product.controller";

const router = express.Router();

router.get('/products/getSingleProduct/:id',getSingleProduct);
router.get('/products/getAllProducts',getProducts);
router.post('/products/create',createProduct);
router.put('/products/update/:id',editProduct);
router.delete('/products/delete/:id',deleteProduct);

export default router;