import React, { useState, useEffect } from "react";
import HeroImg from "../../assets/1.png";
import { FaUsers, FaUtensils } from "react-icons/fa";

// Typewriter component
const TypewriterText = ({ texts, speed = 100, delay = 1500 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (currentIndex === currentText.length && !isDeleting) {
      setIsPaused(true);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex(0);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText(currentText.slice(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);
        } else {
          setDisplayText(currentText.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timer);
  }, [
    displayText,
    currentIndex,
    isDeleting,
    isPaused,
    textIndex,
    texts,
    speed,
    delay,
  ]);

  return (
    <span>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

const Hero = () => {
  const [occupancy, setOccupancy] = useState(45); // Initial occupancy value (percentage)
  const currentDateTime = "2025-04-06 02:09:36";
  const currentUser = "tanishyadav06012005";

  // Texts for typewriter effect
  const heroTexts = [
    "Delicious Food Is Waiting For You",
    "Fresh & Healthy Meals Every Day",
    "Quick Service, Great Taste",
    "Your Campus Dining Experience",
  ];

  // Simulate occupancy changes
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) - 4; // Random value between -4 and 5
      setOccupancy((prev) => {
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 10), 95); // Keep between 10% and 95%
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px] ">
        {/* text section */}
        <div className="flex flex-col justify-center gap-8 text-center md:text-left pt-24 md:p-0 pb-10">
          <h1 className="text-4xl lg:text-6xl font-semibold min-h-[2.5em] lg:min-h-[2em]">
            <TypewriterText texts={heroTexts} speed={45} />
          </h1>
          <p className="mb-2">
            Enjoy a diverse menu of delicious, nutritious meals prepared fresh
            daily. Our canteen offers convenient dining options for students and
            staff with quality ingredients and affordable prices.
          </p>

          {/* Action buttons */}

          {/* Improved Occupancy indicator - without white background */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 text-gray-800">
              <FaUsers className="text-[#FF6600] text-xl" />
              <span className="font-medium">Current Occupancy:</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="h-4 w-full max-w-sm rounded-full overflow-hidden bg-gray-200 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6600] to-orange-500 transition-all duration-1000 ease-in-out"
                  style={{ width: `${occupancy}%` }}
                ></div>
              </div>
              <span className="font-bold text-lg text-[#FF6600] min-w-[45px]">
                {occupancy}%
              </span>
            </div>
          </div>
        </div>

        {/* image section */}
        <div className="flex flex-col justify-center relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-br from-[#FF6600]/10 to-orange-500/10 rounded-full animate-pulse"></div>

          <img
            src={HeroImg}
            alt="Delicious Food"
            className="animate-spin-slow img-shadow w-[400px] mx-auto relative z-10"
          />

          {/* Active users badge */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
