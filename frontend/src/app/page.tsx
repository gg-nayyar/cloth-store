"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import ScrollProgress from "@/components/ui/scroll-progress";
import Link from "next/link";
import Button from "@/components/ui/interactive-hover-button";

export default function Home() {
  return (
    <div className="h-screen w-full ">
      <Image
        className="bg-cover h-screen w-full -z-50 fixed "
        src="/background.webp"
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
            className="bg-transparent w-48 hover:bg-red-500"
          />
          </Link>
        </div>
      </div>
      <div className="flex flex-col rounded bg-white bold bg-opacity-70">
        <h1 className="text-4xl font-extrabold dark:text-black mb-5 mt-3">Explore Categories:</h1>
        <div className="flex place-content-evenly">
          <Link href="/men">
          <div className="flex flex-col items-center">
          <Image
            className="w-52 h-64"
            src="/men.gif"
            height={100}
            width={100}
            alt="Men.gif"
            unoptimized
          />
          <h2 className="p-4">Men</h2>
          </div>
          </Link>
          <Link href="/women">
          <div className="flex flex-col items-center">
          <Image
            className="w-52 h-64"
            src="/women.gif"
            height={100}
            width={100}
            alt="Women.gif"
            unoptimized
          />
          <h2 className="p-4">Women</h2>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
