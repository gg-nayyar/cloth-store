"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Header from "@/components/header";
import Card from "@/components/card";

const Page = () => {
    interface Product{
        _id: string,
        name: string,
        price: number,
        description:string;
        images: Array<string>
    }
    const [products,setProducts] = useState<Product[]>([])
  async function getAllProducts() {
    const response = await axios.get<{ products: Product[] }>(
      "http://localhost:8000/api/products/getAllProducts"
    );
    console.log(response.data.products)
    setProducts(response.data.products);
  }
  useEffect(() => {
      getAllProducts();
    }, []);
    // const response = getAllProducts();
  return (
    <div>
        <Image
                className="bg-cover h-screen w-full -z-50 fixed "
                src="/productBackground.webp"
                height={100}
                width={100}
                alt="Background"
                unoptimized
              />
        <Header/>
        {products.map((product) => {
            return <Card key={product._id} name={product.name} description={product.description} price={product.price} image="/men.gif" />
        })}
      {/* <button className="h-52 w-52" onClick={getAllProducts}>
        Click Me!!
      </button> */}
    </div>
  );
};

export default Page;