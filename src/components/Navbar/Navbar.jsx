import React from "react";
import Profile from "../../assets/profile.png";
import {
  FaShoppingCart,
  FaGraduationCap,
  FaHome,
  FaUtensils,
  FaSearch,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ cartItems = [], onCartClick }) => {
  const location = useLocation();

  return (
    <div className="py-4 fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container flex justify-between items-center">
        {/* logo section */}
        <div>
          <Link to="/" className="text-2xl lg:text-3xl font-bold">
            <span className="text-indigo-600">Campus</span>Pulse
          </Link>
        </div>

        {/* Menu and features section */}
        <div className="flex items-center gap-6">
          {/* Navigation links */}
          <div className="hidden sm:flex items-center gap-7">
            <Link
              to="/"
              className={`font-medium ${
                location.pathname === "/"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              } transition-colors flex items-center gap-1`}
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </Link>
            <Link
              to="/canteen"
              className={`font-medium ${
                location.pathname === "/canteen"
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500"
              } transition-colors flex items-center gap-1`}
            >
              <FaUtensils className="text-sm" />
              <span>Canteen</span>
            </Link>
            <Link
              to="/scholarship"
              className={`font-medium ${
                location.pathname === "/scholarship"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              } transition-colors flex items-center gap-1`}
            >
              <FaGraduationCap className="text-sm" />
              <span>Scholarships</span>
            </Link>
            <Link
              to="/lost-found"
              className={`font-medium ${
                location.pathname === "/lost-found"
                  ? "text-cyan-600"
                  : "text-gray-700 hover:text-cyan-600"
              } transition-colors flex items-center gap-1`}
            >
              <FaSearch className="text-sm" />
              <span>Lost & Found</span>
            </Link>
          </div>

          {/* Cart icon */}
          <div className="relative cursor-pointer" onClick={onCartClick}>
            <FaShoppingCart className="text-lg text-gray-700 hover:text-indigo-600 transition-colors" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* profile icon */}
          <div className="flex items-center">
            <img
              src={Profile}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-indigo-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
