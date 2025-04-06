import React, { useState } from "react";
import Image1 from "../../assets/3.png";
import Image2 from "../../assets/4.png";
import Image3 from "../../assets/5.png";
import { FaRegClock, FaMicrophone, FaHotjar } from "react-icons/fa";

// Popular Indian dishes served in college canteens with pricing for different sizes
const FoodData = [
  // New voice-recognition ready items (positioned at the top)
  {
    id: 7,
    image: Image1,
    nutritionRating: 88,
    basePrice: 250,
    name: "Paneer tikka",
    desc: "Grilled cottage cheese with spices and vegetables.",
    availableIn: 0, // Available immediately
    prices: {
      small: 220,
      medium: 250,
      large: 280,
    },
  },
  {
    id: 8,
    image: Image2,
    nutritionRating: 92,
    basePrice: 270,
    name: "Veg thali",
    desc: "Complete Indian meal with roti, sabji, raita and sweet dish.",
    availableIn: 5, // Available in 5 minutes
    prices: {
      small: 240,
      medium: 270,
      large: 300,
    },
  },
  {
    id: 9,
    image: Image3,
    nutritionRating: 84,
    basePrice: 290,
    name: "Mughlai Special",
    desc: "Royal Mughlai feast with biryani, kebabs and creamy curries.",
    availableIn: 0, // Available immediately
    prices: {
      small: 260,
      medium: 290,
      large: 320,
    },
  },
  // Original menu items
  {
    id: 1,
    image: Image1,
    nutritionRating: 78,
    basePrice: 120,
    name: "Chole Bhature",
    desc: "Spicy chickpea curry served with fried bread.",
    availableIn: 0, // Available immediately
    prices: {
      small: 100,
      medium: 120,
      large: 150,
    },
  },
  {
    id: 2,
    image: Image2,
    nutritionRating: 85,
    basePrice: 80,
    name: "Masala Dosa",
    desc: "Crispy rice pancake filled with spiced potatoes.",
    availableIn: 10, // Available in 10 minutes
    prices: {
      small: 70,
      medium: 80,
      large: 100,
    },
  },
  {
    id: 3,
    image: Image3,
    nutritionRating: 65,
    basePrice: 90,
    name: "Butter chicken thali",
    desc: "fiery chicken in butter tomato syrup with naan.",
    availableIn: 15, // Available in 15 minutes
    prices: {
      small: 75,
      medium: 90,
      large: 115,
    },
  },
  {
    id: 4,
    image: Image2,
    nutritionRating: 72,
    basePrice: 60,
    name: "Vada Pav",
    desc: "Spicy potato fritter in a bun with chutneys.",
    availableIn: 5, // Available in 5 minutes
    prices: {
      small: 50,
      medium: 60,
      large: 75,
    },
  },
  {
    id: 5,
    image: Image1,
    nutritionRating: 90,
    basePrice: 140,
    name: "Rajma Chawal",
    desc: "Kidney bean curry served with steamed rice.",
    availableIn: 0, // Available immediately
    prices: {
      small: 120,
      medium: 140,
      large: 170,
    },
  },
  {
    id: 6,
    image: Image3,
    nutritionRating: 68,
    basePrice: 110,
    name: "Pav Bhaji",
    desc: "Spiced vegetable mash served with buttered rolls.",
    availableIn: 8, // Available in 8 minutes
    prices: {
      small: 90,
      medium: 110,
      large: 135,
    },
  },
];

const TopList = ({ addToCart }) => {
  // Default all items to medium size
  const initSizes = FoodData.reduce((acc, _, index) => {
    acc[index] = "medium";
    return acc;
  }, {});

  const [selectedSizes, setSelectedSizes] = useState(initSizes);
  const [addedItems, setAddedItems] = useState({});
  const currentDateTime = "2025-04-06 04:38:25";
  const currentUser = "tanishyadav06012005";

  // Function to get color based on nutrition rating
  const getNutritionColor = (rating) => {
    if (rating >= 80) return "text-green-600";
    if (rating >= 65) return "text-yellow-600";
    return "text-red-600";
  };

  // Handle serving size selection
  const handleSizeSelect = (index, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [index]: size,
    }));
  };

  // Handle adding item to cart
  const handleAddToCart = (item, index) => {
    const size = selectedSizes[index] || "medium";
    const price = item.prices[size];

    // Add the full item data for better display in cart
    addToCart({
      id: item.id,
      name: item.name,
      price: price,
      size: size,
      image: item.image,
      desc: item.desc,
    });

    // Mark item as added
    setAddedItems((prev) => ({
      ...prev,
      [index]: true,
    }));

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [index]: false,
      }));
    }, 2000);

    // Trigger a custom event to update occupancy
    const event = new CustomEvent("new-booking");
    window.dispatchEvent(event);
  };

  return (
    <div id="top-list-section" className="container py-14">
      {/* header section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold">Today's Menu</h1>
        <p>Popular Indian dishes served in our college canteen</p>
      </div>

      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {FoodData.map((item, index) => (
          <div
            key={index}
            className={`bg-white/50 p-5 lg:p-6 rounded-3xl hover:scale-105 transition duration-300 shadow-md ${
              item.voiceEnabled
                ? "border-2 border-[#FF6600]/30 relative overflow-hidden"
                : ""
            }`}
          >
            {/* Voice ordering badge for special items */}
            {item.voiceEnabled && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FF6600] to-orange-600 text-white text-xs py-1 px-2 rounded-full flex items-center">
                <FaHotjar className="mr-1" /> Voice Order Ready
              </div>
            )}

            <img
              src={item.image}
              alt={item.name}
              className="w-60 sm:w-40 lg:w-[240px] mx-auto object-cover rounded-full img-shadow"
            />
            <div className="space-y-3 mt-4">
              {/* Nutrition Rating */}
              <div className="flex items-center justify-between">
                <p
                  className={`font-medium ${getNutritionColor(
                    item.nutritionRating
                  )}`}
                >
                  Nutrition: {item.nutritionRating}%
                </p>
                <div
                  className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                  title={`Nutritional Rating: ${item.nutritionRating}%`}
                >
                  <div
                    className={`h-full ${
                      item.nutritionRating >= 80
                        ? "bg-green-500"
                        : item.nutritionRating >= 65
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${item.nutritionRating}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-xl font-semibold">{item.name}</p>
              <p className="text-gray-600">{item.desc}</p>

              {/* Serving Sizes */}
              <div className="flex gap-2 pt-2">
                <button
                  className={`px-2 py-1 text-xs rounded-full border ${
                    selectedSizes[index] === "small"
                      ? "bg-[#FF6600] text-white"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSizeSelect(index, "small")}
                >
                  Small
                </button>
                <button
                  className={`px-2 py-1 text-xs rounded-full border ${
                    selectedSizes[index] === "medium" || !selectedSizes[index]
                      ? "bg-[#FF6600] text-white"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSizeSelect(index, "medium")}
                >
                  Medium
                </button>
                <button
                  className={`px-2 py-1 text-xs rounded-full border ${
                    selectedSizes[index] === "large"
                      ? "bg-[#FF6600] text-white"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSizeSelect(index, "large")}
                >
                  Large
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-lg font-semibold">
                  ₹{item.prices[selectedSizes[index] || "medium"]}
                </p>

                {/* Add to Cart button */}
                {item.availableIn === 0 ? (
                  <button
                    className={`${
                      addedItems[index] ? "bg-green-500" : "bg-[#FF6600]"
                    } text-white px-4 py-1 rounded-full text-sm hover:bg-opacity-90 transition flex items-center`}
                    onClick={() => handleAddToCart(item, index)}
                  >
                    {addedItems[index] ? "Added!" : "Add to Cart"}
                    {item.voiceEnabled && !addedItems[index] && (
                      <FaMicrophone className="ml-1 text-xs" />
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-orange-500">
                    <FaRegClock />
                    <span className="text-sm">
                      Available in {item.availableIn} mins
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Voice ordering hint */}
      
    </div>
  );
};

export default TopList;
