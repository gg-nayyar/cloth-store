"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
        default: [],
    },
    stuff: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['top', 'bottom', 'shoes', 'accessories'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
    //   reviews: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Review",
    //     },
    //   ],
});
exports.default = mongoose_1.default.model("Product", productSchema);
