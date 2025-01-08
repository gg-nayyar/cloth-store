import React from 'react'
import axios from 'axios';

const page = async() => {
    const response = await axios.get("http://localhost:8000/api/products/getAllProducts");
    console.log(response.data);
  return (
    <div>
      
    </div>
  )
}

export default page
