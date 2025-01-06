"use client";
import React from "react";
import Image from "next/image";
import LoginForm from "../components/login-form";
import axios from "axios";

export default function Home() {
  type LoginFormData = {
    email: string;
    password: string;
  };
  const handleLoginData = async (data: LoginFormData) => {
    console.log("DATA: ", data);
    const response = await axios.post<{token:string,user:object}>(
      "http://localhost:8001/api/login",
      data,
      { withCredentials: true }
    );
    if(response.data.token){
      window.location.href = '/home'
    }
  }; 
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full w-3/4 bg-skin">
        <LoginForm onSubmit={handleLoginData} />
      </div>
      <div className="h-full bg-skin">
        <Image
          className=" p-10 h-full w-full"
          src="/login.gif"
          height={100}
          width={100}
          alt="Picture of a model"
          unoptimized
        />
      </div>
    </div>
  );
}
