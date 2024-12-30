import express from "express";
import { createProduct, getProducts ,deleteProduct } from "../controller/product.controller";

const router = express.Router();

router.post('/products/create',createProduct);
router.get('/products/getAllProducts',getProducts);
router.delete('/products/delete/:id',deleteProduct);

export default router;