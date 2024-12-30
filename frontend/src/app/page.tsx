"use client"
import React from "react";

export default function Home() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8001/api/google";
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: "10px 20px", background: "#4285F4", color: "#fff", border: "none", cursor: "pointer" }}>
      Sign in with Google
    </button>
  );
}
