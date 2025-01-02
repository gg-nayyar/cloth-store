import dotenv from "dotenv";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import orderModel from "../models/order.model";

dotenv.config();

export const createOrder = async (req:Request, res:Response)=>{
    try {
        const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body; 
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token!, process.env.JWT_KEY!) as jwt.JwtPayload;
        const newOrder = new orderModel({
            user: decoded.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        await newOrder.save();
        res.json({message:"Order created successfully",order:newOrder});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
    
}
export const getAllOrders = async (req:Request, res:Response)=>{
    try {
        const orders = await orderModel.find();
        res.json({orders});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
export const getSingleOrder = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const order = await orderModel.findById(id);
        res.json({order});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
export const deleteOrder = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        await orderModel.findByIdAndDelete(id);
        res.json({message:"Order deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
});
export const createPaymentIntent = async (req:Request, res:Response)=>{
    try {
        const {amount} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
        });
        res.json({client_secret:paymentIntent.client_secret});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
