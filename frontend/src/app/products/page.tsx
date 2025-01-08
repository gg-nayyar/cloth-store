'use client'
import React from 'react'
import axios from 'axios';

const page = () => {
    async function getAllProducts(){
        const response = await axios.get("http://localhost:8000/api/products/getAllProducts");
        console.log(response.data);
    }
  return (
    <div>
      <button className='h-52 w-52' onClick={getAllProducts}>Click Me!!</button>
    </div>
  )
}

export default page
