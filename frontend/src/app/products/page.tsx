"use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
import Image from "next/image";
import Header from "@/components/header";
import Card from "@/components/card";
import { useRouter } from "next/navigation";

const Page = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string;
  }
  const router = useRouter();
  const products: Product[] = [
    {
      _id: "cl001",
      name: "Classic Denim Jacket",
      price: 59.99,
      description:
        "A timeless denim jacket with button closures and chest pockets.",
      images:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoveritup.com%2Fproducts%2Fofficial-dc-wonder-woman-classic-denim-jacket&psig=AOvVaw3-hY4PMaXko5L16sEi3hd0&ust=1746691887140000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCgwr70kI0DFQAAAAAdAAAAABAE",
    },
    {
      _id: "cl002",
      name: "Graphic T-Shirt",
      price: 19.99,
      description: "Soft cotton t-shirt featuring a modern abstract print.",
      images: "https://example.com/images/graphic-tee.jpg",
    },
    {
      _id: "cl003",
      name: "Men's Chino Pants",
      price: 39.99,
      description:
        "Slim-fit chino pants made from stretch fabric for all-day comfort.",
      images: "https://example.com/images/chino-front.jpg",
    },
    {
      _id: "cl004",
      name: "Women's Floral Dress",
      price: 49.99,
      description:
        "Lightweight summer dress with a floral pattern and ruffle details.",
      images: "https://example.com/images/floral-dress.jpg",
    },
  ];

  // async function getAllProducts() {
  //   const response = await axios.get<{ products: Product[] }>(
  //     "http://localhost:8000/api/products/getAllProducts"
  //   );
  //   console.log(response.data.products)
  //   // setProducts(response.data.products);
  // }
  // useEffect(() => {
  //     getAllProducts();
  //   }, []);
  //   // const response = getAllProducts();
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
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {products.map((product) => {
          return (
            <Card
              className="w-full h-full m-5"
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image="/men.gif"
              onClick={() => {
                router.push(`/products/${product._id}`);
              }}
            />
          );
        })}
      </div>
      {/* <button className="h-52 w-52" onClick={getAllProducts}>
        Click Me!!
      </button> */}
    </div>
  );
};

export default Page;
