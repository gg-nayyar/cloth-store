"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/card";
import {useRouter} from "next/navigation";
import Header from "@/components/header";
import Footer from "../components/footer"
import React, { useEffect, useState } from "react";
import ScrollProgress from "@/components/ui/scroll-progress";
import Button from "@/components/ui/interactive-hover-button";


export default function Home() {
  interface Product {
    _id: number;
    name: string;
    price: number;
    description: string;
    image: string[];
    material?: string;
    type?: string;
    category?: string;
    gender?: string;
    onClick?: () => void;
  }
  const router = useRouter();
  const [products,setProducts] = useState<Product[]>([])
  
  function getProductsByDate(){
      axios.get("http://localhost:8000/api/products/getAllProducts").then((response) => {
      const data = response.data as { products: Product[] }; 
      console.log(data.products);
      setProducts(data.products);
  });
}
  useEffect(() => {
    getProductsByDate();
  }, []);
  return (
    <div className="h-screen w-full ">
      <Image
        className="bg-cover h-screen w-full -z-50 fixed "
        src="/background_cloth.webp"
        height={100}
        width={100}
        alt="Background"
        unoptimized
      />
      <div className="sticky top-0">
        <ScrollProgress />
        <Header />
      </div>
      <div className="flex items-center h-full w-full ">
        <div className="flex justify-center bg-transparent h-16 w-full">
          <Link href="/products">
          <Button
            text="Explore New Catalogue"
            className="bg-gray-50 opacity-90 w-48 hover:bg-brown"
          />
          </Link>
        </div>
      </div>
      <div className="flex flex-col rounded bg-white bold bg-opacity-70">
        <h1 className="text-4xl font-playwrite p-5 text-brown font-extrabold dark:text-black mb-5 mt-3">Explore Categories:</h1>
        <div className="flex place-content-evenly">
          <Link href="/men">
          <div className="flex flex-col items-center border-4 bg-brown mb-8 rounded-md border-brown">
          <Image
            className="w-52 h-64 "
            src="/men.gif"
            height={100}
            width={100}
            alt="Men.gif"
            unoptimized
          />
          <h2 className="p-4 text-white font-playwrite">Men</h2>
          </div>
          </Link>
          <Link href="/women">
          <div className="flex flex-col items-center border-4 bg-brown mb-8 rounded-md border-brown">
          <Image
            className="w-52 h-64"
            src="/women.gif"
            height={100}
            width={100}
            alt="Women.gif"
            unoptimized
          />
          <h2 className="p-4 text-white font-playwrite">Women</h2>
          </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col bg-white bg-opacity-70">
        <h1 className="text-4xl font-playwrite p-5 text-brown font-extrabold dark:text-black mb-5 mt-3">New Arrivals:</h1>
         <div className="flex h-auto w-full">
         {products.map((product) => {
            return (
              <Card
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image="/men.gif"
              onClick={() => {
                console.log(`Navigating to /product/${product._id}`);
                router.push(`/products/${product._id}`);
              }}
              />
            );
        })}
         </div>
      </div>
      <Footer/>
    </div>
  );
}
