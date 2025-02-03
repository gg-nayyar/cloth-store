import React from "react";
import Link from "next/link";

const header = () => {
  return (
    <div>
      <header>
        <nav className="bg-transparent border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <Link href="/" className="font-playwrite flex items-center justify-center text-brown">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
            <span className="font-playwrite self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              The-Cloth-Store
            </span>
          </Link>
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center lg:order-2">
              <a
                href="/login"
                className="font-bold font-mono opacity-80 dark:text-brown bg-gray-50 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </a>
            </div>
            <div className="hidden justify-center items-center w-full lg:flex lg:w-auto lg:order-1"></div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default header;
