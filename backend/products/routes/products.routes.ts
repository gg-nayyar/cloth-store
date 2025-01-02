import express from "express";
import { createProduct, getProducts, editProduct, getSingleProduct, deleteProduct } from "../controller/product.controller";

const router = express.Router();

router.get('/getSingleProduct/:id',getSingleProduct);
router.get('/getAllProducts',getProducts);
router.post('/create',createProduct);
router.put('/update/:id',editProduct);
router.delete('/delete/:id',deleteProduct);

export default router;