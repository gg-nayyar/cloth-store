import express from "express";
import isAdmin from "../utils/admin.middleware";
import { createProduct, getProducts, editProduct, getSingleProduct, deleteProduct } from "../controller/product.controller";

const router = express.Router();

router.get('/getSingleProduct/:id',getSingleProduct);
router.get('/getAllProducts',getProducts);
router.post('/create',isAdmin,createProduct);
router.put('/update/:id',isAdmin,editProduct);
router.delete('/delete/:id',isAdmin,deleteProduct);

export default router;