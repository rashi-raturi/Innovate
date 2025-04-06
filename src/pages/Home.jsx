import React from "react";
import {
  FaUtensils,
  FaGraduationCap,
  FaSearch,
  FaHeart,
  FaMicrophone,
} from "react-icons/fa";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import WaveBackground from "../components/WaveBackground/WaveBackground";
import Navbar from "../components/Navbar/Navbar";
import VoiceOrder from "../components/VoiceOrder/VoiceOrder";
import { useNavigate } from "react-router-dom";

const Home = ({ cartItems, addToCart }) => {
  const navigate = useNavigate();
  const currentDateTime = "2025-04-06 04:17:23";
  const currentUser = "tanishyadav06012005";

  const handleCartClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen relative bg-white flex flex-col">
      <WaveBackground />
      <Navbar cartItems={cartItems} onCartClick={handleCartClick} />

      <div className="container mx-auto pt-28 pb-20 px-4 relative z-10 flex flex-col items-center justify-center flex-grow">
        <div className="text-center mb-16 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="text-indigo-600">Campus</span>Pulse
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Your centralized hub for campus life - connecting students with
            essential services for a seamless university experience.
          </p>

          {/* New Voice Ordering Promo */}
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Canteen Card */}
          <ServiceCard
            title="Canteen"
            description="Order delicious food from the campus canteen. Skip the lines with easy online ordering and pickup."
            icon={<FaUtensils className="text-3xl" />}
            link="/canteen"
            accentColor="#FF6600"
            theme="orange"
          />

          {/* Scholarship Card */}
          <ServiceCard
            title="Scholarships"
            description="Discover scholarships matching your profile. Get financial aid and track your applications easily."
            icon={<FaGraduationCap className="text-3xl" />}
            link="/scholarship"
            accentColor="#4F46E5"
            theme="indigo"
          />

          {/* Lost and Found Card */}
          <ServiceCard
            title="Lost & Found"
            description="Report lost items or help others find their belongings. Reconnect with your missing possessions."
            icon={<FaSearch className="text-3xl" />}
            link="/lost-found"
            accentColor="#0EA5E9"
            theme="cyan"
          />
        </div>
      </div>

      {/* Voice Order Component */}
      

      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-sm text-white py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-3">
              <div className="h-px w-12 bg-indigo-300 opacity-50"></div>
              <div className="mx-4 text-lg font-medium flex items-center">
                <span className="text-indigo-200">Crafted with passion by</span>
                <FaHeart className="mx-2 text-pink-400 animate-pulse" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-indigo-300 font-bold">
                  Team Moye Moye
                </span>
              </div>
              <div className="h-px w-12 bg-indigo-300 opacity-50"></div>
            </div>
            <p className="text-indigo-200 text-sm">
              Empowering campus experiences with innovative solutions
            </p>
            <p className="text-indigo-300/60 text-xs mt-3">
              © {new Date().getFullYear()} CampusPulse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
