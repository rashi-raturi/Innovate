import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TopList from "./components/TopList/TopList";
import Banner from "./components/Banner/Banner";
import OurServices from "./components/OurServices/OurServices";
import Checkout from "./pages/Checkout";
import Scholarship from "./pages/Scholarship";
import LostFound from "./pages/LostFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BgImage from "./assets/2.png";
import VendorDashboard from "./pages/VendorDashboard";
import VoiceOrder from "./components/VoiceOrder/VoiceOrder";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Improved add to cart function that checks for existing items
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(
        (cartItem) => cartItem.name.toLowerCase() === item.name.toLowerCase()
      );

      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map((cartItem) =>
          cartItem.name.toLowerCase() === item.name.toLowerCase()
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + (item.quantity || 1),
              }
            : cartItem
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  // Login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Navigate function needs to be within router context
  const AppContent = () => {
    const navigate = useNavigate();

    const handleCartClick = () => {
      navigate("/checkout");
    };

    return (
      <Routes>
        {/* Login as the starting route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Home Page (new landing page with service cards) */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home cartItems={cartItems} addToCart={addToCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />

        {/* Canteen Page (original food ordering page) */}
        <Route
          path="/canteen"
          element={
            isLoggedIn ? (
              <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
                <Navbar cartItems={cartItems} onCartClick={handleCartClick} />
                <div className="pt-24">
                  {/* Voice Order component above the Hero */}
                  <div className="container mx-auto px-4 mb-6">
                    <VoiceOrder onAddToCart={addToCart} />
                  </div>
                  <Hero />
                  <TopList addToCart={addToCart} />
                  <Banner />
                  <OurServices />
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Checkout Page */}
        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <Checkout cartItems={cartItems} clearCart={clearCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Scholarship Page */}
        <Route
          path="/scholarship"
          element={
            isLoggedIn ? (
              <Scholarship cartItems={cartItems} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Lost & Found Page */}
        <Route
          path="/lost-found"
          element={
            isLoggedIn ? (
              <LostFound cartItems={cartItems} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };

  return (
    <div style={bgStyle} className="overflow-x-hidden font-sans">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
};

export default App;
