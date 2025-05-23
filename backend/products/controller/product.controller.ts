import productModel from "../models/product.model";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, material, type, category, gender } = req.body;
    const newProduct = new productModel({ name, price, description, image, material, type, category, gender});
    await newProduct.save();
    res.json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error aaaa" });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
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
export const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        res.json({ product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export const editProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, image,stuff, type, category, gender } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(id, { name, description, price, image, stuff, type, category, gender}, { new: true });
        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}