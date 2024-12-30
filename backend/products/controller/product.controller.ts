import productModel from "../models/product.model";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = new productModel({ name, description, price, image });
    await newProduct.save();
    res.json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};