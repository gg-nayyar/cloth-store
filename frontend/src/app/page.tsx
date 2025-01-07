"use client"
import React from "react"
import Image from "next/image";

export default function Home() {
  return(
    <div className=" flex h-screen w-full">
      <Image className="bg-cover h-screen w-full -z-50 fixed "
      src=  "/background.webp"
      height={100}
      width={100}
      alt="Background"
      unoptimized 
      />
      <div className="  flex self-center relative justify-center items-center bg-transparent h-16 w-full">
      <button className="h-16 w-32">
        <h1>Explore new catalogue</h1>
      </button>
      </div>
    </div>
  );
}
