import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/image/logo.png"
import User from "../assets/image/user.png"

export default function NavBar() {
  return (
    <>
      <nav
        className="bg-white border-gray-200 w-full"
        style={{ backgroundColor: "#394867" }}
      >
        <div className="mx-auto flex flex-wrap justify-start items-center p-4">
          <Link to="/"> 
          <a
            className="flex items-center space-x-3 rtl:space-x-reverse"
            >
            <img
              src={Logo}
              className="h-8"
              alt="Logo"
            />
          </a>
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="ms-2 block w-full p-2 pl-10 text-sm text-gray-600 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-50"
                placeholder="Search..."
              />
            </div>
            {/* <div className="flex justify-end">
              <img src={User} alt="profile" className="h-6 w-6" />
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
}
