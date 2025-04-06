import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const themeStyles = {
  orange: {
    bg: "bg-gradient-to-br from-orange-50 to-white",
    iconBg: "bg-orange-100",
    iconColor: "#FF6600",
    buttonBg:
      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
    shadow: "shadow-orange-100",
    hover: "hover:shadow-orange-200",
    border: "border-orange-100",
  },
  indigo: {
    bg: "bg-gradient-to-br from-indigo-50 to-white",
    iconBg: "bg-indigo-100",
    iconColor: "#4F46E5",
    buttonBg:
      "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
    shadow: "shadow-indigo-100",
    hover: "hover:shadow-indigo-200",
    border: "border-indigo-100",
  },
  cyan: {
    bg: "bg-gradient-to-br from-cyan-50 to-white",
    iconBg: "bg-cyan-100",
    iconColor: "#0EA5E9",
    buttonBg:
      "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
    shadow: "shadow-cyan-100",
    hover: "hover:shadow-cyan-200",
    border: "border-cyan-100",
  },
};

const ServiceCard = ({
  title,
  description,
  icon,
  link,
  accentColor = "#4F46E5",
  theme = "indigo",
}) => {
  const style = themeStyles[theme];

  return (
    <div
      className={`${style.bg} rounded-xl shadow-lg ${style.shadow} overflow-hidden hover:shadow-xl ${style.hover} transition-all duration-300 border ${style.border}`}
    >
      <div className="p-8">
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-full ${style.iconBg} mb-6 mx-auto`}
        >
          <div style={{ color: style.iconColor }}>{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 text-center">{description}</p>
        <div className="flex justify-center">
          <Link
            to={link}
            className={`inline-flex items-center justify-center text-white font-medium rounded-full px-5 py-2.5 ${style.buttonBg} transition-all duration-200 shadow-md hover:shadow-lg`}
          >
            Explore {title} <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
