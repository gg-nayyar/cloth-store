'use client'
import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Header from "../../../components/header";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="min-h-screen bg-skin text-white p-6">
        <Header />
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-10 p-6">
        <div className="w-full lg:w-1/2">
          <img
            src="https://via.placeholder.com/500"
            alt="Product"
            className="w-full rounded-lg"
          />
          <div className="flex mt-4 gap-2">
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="w-16 h-16 border cursor-pointer" />
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="w-16 h-16 border cursor-pointer" />
            <img src="https://via.placeholder.com/100" alt="Thumbnail" className="w-16 h-16 border cursor-pointer" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white text-black p-6 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold">Big Italian Sofa</h2>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <FaRegStar className="text-gray-400" />
            <span className="ml-2 text-gray-500">(150 reviews)</span>
          </div>
          <p className="text-green-600 font-semibold mt-2">Availability: In Stock</p>
          <p className="text-gray-700">Brand: <span className="font-semibold">apex</span></p>
          <p className="text-gray-700">Category: <span className="font-semibold">Sofa</span></p>
          <p className="text-gray-700">SKU: BE45VGTRK</p>

          {/* Price */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-semibold text-yellow-500">$450</span>
            <span className="text-gray-400 line-through text-xl">$599</span>
          </div>
          <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque!</p>
          <div className="mt-4">
            <h4 className="font-semibold">Size:</h4>
            <div className="flex gap-2 mt-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button key={size} className="border px-4 py-1 rounded-lg hover:bg-gray-200 transition">{size}</button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Color:</h4>
            <div className="flex gap-2 mt-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full cursor-pointer"></div>
              <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
              <div className="w-8 h-8 bg-brown rounded-full cursor-pointer"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <h4 className="font-semibold">Quantity:</h4>
            <div className="flex items-center border rounded-lg">
              <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 hover:bg-gray-300"> <AiOutlineMinus /> </button>
              <span className="px-4">{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 hover:bg-gray-300"> <AiOutlinePlus /> </button>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-brown text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition">
              Add to Cart
            </button>
            <button className="flex-1 border border-yellow-500 text-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-white transition">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;