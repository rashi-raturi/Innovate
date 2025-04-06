import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import WaveBackground from "../components/WaveBackground/WaveBackground";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCamera,
  FaTag,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
  FaFilter,
  FaUser,
  FaClock,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaComment,
  FaCheckCircle,
  FaInfoCircle,
  FaWhatsapp,
  FaHeadset,
  FaBuilding,
} from "react-icons/fa";

// Import the images
import calcImg from "../assets/calc.jpg";
import bottleImg from "../assets/bottle.jpg";
import umbrellaImg from "../assets/umm.jpg";
import idImg from "../assets/ID.jpg";

// Sample lost and found items with the actual images
const lostFoundItems = [
  {
    id: 1,
    type: "lost",
    title: "Blue Water Bottle",
    description:
      "Lost my blue Hydro Flask water bottle near the library on Monday afternoon.",
    location: "Main Library",
    date: "2025-04-02",
    image: bottleImg,
    category: "Personal Item",
    contact: "contact@example.com",
    status: "open",
    postedBy: "tanishyadav06012005",
    phone: "+91 9876543210",
    reward: "₹200",
    identifyingFeatures: "Blue Hydro Flask with a sticker of a mountain on it",
  },
  {
    id: 2,
    type: "found",
    title: "Calculator (TI-84)",
    description: "Found a TI-84 calculator in Room 204 after the math class.",
    location: "Science Building, Room 204",
    date: "2025-04-03",
    image: calcImg,
    category: "Electronics",
    contact: "finder@example.com",
    status: "open",
    postedBy: "helpfulstudent",
    phone: "+91 8765432109",
    identifyingFeatures:
      "Black TI-84 Plus calculator with a small scratch on the screen",
  },
  {
    id: 3,
    type: "lost",
    title: "Student ID Card",
    description:
      "Lost my student ID card somewhere in the cafeteria during lunch.",
    location: "Main Cafeteria",
    date: "2025-04-04",
    image: idImg,
    category: "ID/Documents",
    contact: "student@example.com",
    status: "open",
    postedBy: "mathstudent123",
    phone: "+91 7654321098",
    reward: "₹100",
    identifyingFeatures: "Blue student ID with name 'Alex Johnson'",
  },
  {
    id: 4,
    type: "found",
    title: "Black Umbrella",
    description:
      "Found a black umbrella at the bus stop outside the student center.",
    location: "Bus Stop near Student Center",
    date: "2025-04-01",
    image: umbrellaImg,
    category: "Personal Item",
    contact: "finderemail@example.com",
    status: "open",
    postedBy: "campushelper",
    phone: "+91 6543210987",
    identifyingFeatures: "Black automatic umbrella with wooden handle",
  },
];

const LostFound = ({ cartItems = [] }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("lost");
  const currentDateTime = "2025-04-06 02:26:14";
  const currentUser = "tanishyadav06012005";

  // Contact modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [contactMessage, setContactMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  // Show contact details modal
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  // Form state
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    contact: "",
    image: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter items based on active tab and search query
  const getFilteredItems = () => {
    let filteredItems = lostFoundItems;

    // Filter by type (lost/found)
    if (activeTab === "lost") {
      filteredItems = filteredItems.filter((item) => item.type === "lost");
    } else if (activeTab === "found") {
      filteredItems = filteredItems.filter((item) => item.type === "found");
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return filteredItems;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert(`Your ${formType} item has been reported successfully!`);
    setShowForm(false);
    // Reset form
    setNewItem({
      title: "",
      description: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      contact: "",
      image: null,
    });
  };

  // Open contact modal
  const openContactModal = (item) => {
    setSelectedItem(item);
    setShowContactModal(true);
    setMessageSent(false);
    setContactMessage("");
  };

  // Close contact modal
  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedItem(null);
  };

  // Handle contact message submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the contact message to your backend
    setTimeout(() => {
      setMessageSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* Background */}
      <WaveBackground />

      <Navbar cartItems={cartItems} onCartClick={() => navigate("/checkout")} />

      <div className="container mx-auto pt-28 pb-20 px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Lost & Found Center
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Report lost items or help others find their belongings
          </p>

          {/* User info and datetime in a subtle banner */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with actions */}
          <div className="bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Find or Report
              </h2>
              <div className="h-8 w-8 rounded-full bg-cyan-50 flex items-center justify-center">
                <FaSearch className="text-cyan-600 text-sm" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-5 shadow-sm border border-cyan-100">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <FaPlus className="text-cyan-600 mr-2" /> Report an Item
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Lost something or found someone else's belongings? Report it
                  here.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setFormType("lost");
                      setShowForm(true);
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:shadow transition-all duration-200"
                  >
                    I Lost Something
                  </button>
                  <button
                    onClick={() => {
                      setFormType("found");
                      setShowForm(true);
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:shadow transition-all duration-200"
                  >
                    I Found Something
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <FaFilter className="text-cyan-600 mr-2" /> Filter Items
                </h3>
                <div className="flex bg-gray-50 rounded-full p-1 mb-5 shadow-inner">
                  <button
                    className={`flex-1 px-3 py-1.5 text-sm rounded-full font-medium transition-all duration-200 ${
                      activeTab === "all"
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All
                  </button>
                  <button
                    className={`flex-1 px-3 py-1.5 text-sm rounded-full font-medium transition-all duration-200 ${
                      activeTab === "lost"
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("lost")}
                  >
                    Lost
                  </button>
                  <button
                    className={`flex-1 px-3 py-1.5 text-sm rounded-full font-medium transition-all duration-200 ${
                      activeTab === "found"
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("found")}
                  >
                    Found
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
                  />
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Quick Help Section */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 shadow-sm border border-blue-100 mt-6">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <FaInfoCircle className="text-blue-600 mr-2" /> Quick Help
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Report lost or found items as soon as possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Include clear photos and specific details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Be specific about when and where the item was lost/found
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Check the list regularly — new items are added daily
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Items list and form section */}
          <div className="lg:col-span-2">
            {showForm ? (
              <div className="bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Report {formType === "lost" ? "a Lost" : "a Found"} Item
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Blue Water Bottle"
                      value={newItem.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      name="description"
                      required
                      placeholder="Provide details about the item..."
                      value={newItem.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        placeholder="e.g. Main Library"
                        value={newItem.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date*
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={newItem.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
                      </label>
                      <select
                        name="category"
                        required
                        value={newItem.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Personal Item">Personal Item</option>
                        <option value="ID/Documents">ID/Documents</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email*
                      </label>
                      <input
                        type="email"
                        name="contact"
                        required
                        placeholder="your@email.com"
                        value={newItem.contact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {formType === "lost" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Identifying Features
                      </label>
                      <textarea
                        name="identifyingFeatures"
                        placeholder="Describe any unique features that could help identify the item..."
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-7">
                          <FaCamera className="w-8 h-8 text-gray-400" />
                          <p className="pt-1 text-sm text-gray-500">
                            Click to upload an image
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            // Handle file upload
                            setNewItem((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }));
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                    >
                      Submit Report{" "}
                      <FaArrowRight className="ml-1 inline-block" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {activeTab === "all"
                      ? "All Items"
                      : activeTab === "lost"
                      ? "Lost Items"
                      : "Found Items"}
                  </h2>
                  <span className="text-sm px-3 py-1 bg-cyan-50 rounded-lg text-cyan-700 font-medium">
                    {getFilteredItems().length} items found
                  </span>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
                  {getFilteredItems().length > 0 ? (
                    getFilteredItems().map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition group"
                      >
                        <div className="flex">
                          <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {item.title}
                              </h3>
                              <span
                                className={`text-sm px-3 py-1 rounded-lg font-medium ${
                                  item.type === "lost"
                                    ? "bg-red-50 text-red-600"
                                    : "bg-green-50 text-green-600"
                                }`}
                                style={{
                                  minWidth: "70px",
                                  textAlign: "center",
                                }}
                              >
                                {item.type === "lost" ? "Lost" : "Found"}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <div className="flex items-center text-xs text-gray-500">
                                <FaMapMarkerAlt className="text-cyan-600 mr-1" />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <FaCalendarAlt className="text-cyan-600 mr-1" />
                                <span>{item.date}</span>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center text-xs text-gray-500">
                                <FaTag className="text-cyan-600 mr-1" />
                                <span>{item.category}</span>
                              </div>
                              <button
                                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-xs py-1.5 px-3.5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                                onClick={() => openContactModal(item)}
                              >
                                Contact
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-xl">
                      <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        No matching items found.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Try adjusting your filters or search query.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mt-16 bg-white/95 backdrop-blur-lg rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Contact Lost & Found Center
              </h2>
              <p className="mb-6 opacity-90">
                Have questions or need assistance with lost or found items? Our
                team is here to help!
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1">
                    <FaBuilding className="text-cyan-200" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Campus Location</h3>
                    <p className="text-sm mt-1 opacity-90">
                      Student Center, Room 102
                      <br />
                      Open Monday-Friday, 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1">
                    <FaPhone className="text-cyan-200" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm mt-1 opacity-90">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1">
                    <FaEnvelope className="text-cyan-200" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm mt-1 opacity-90">
                      lostandfound@campus.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1">
                    <FaWhatsapp className="text-cyan-200" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-sm mt-1 opacity-90">+91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                >
                  <FaHeadset className="inline-block mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">
                Contact About {selectedItem.title}
              </h2>
              <button
                onClick={closeContactModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              {messageSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Your message has been sent to the owner. They will contact
                    you soon regarding the{" "}
                    {selectedItem.type === "lost" ? "lost" : "found"} item.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg inline-block">
                    <p className="text-sm text-gray-700">Reference Number:</p>
                    <p className="text-lg font-bold text-gray-800">
                      LF-{selectedItem.id}-{Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={closeContactModal}
                      className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex mb-6">
                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-5 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {selectedItem.title}
                        </h3>
                        <span
                          className={`text-sm px-3 py-1 rounded-lg font-medium ${
                            selectedItem.type === "lost"
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {selectedItem.type === "lost" ? "Lost" : "Found"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        {selectedItem.description}
                      </p>

                      <div className="grid grid-cols-2 mt-3 text-sm text-gray-700">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-cyan-600 mr-2" />
                          <span>{selectedItem.location}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-cyan-600 mr-2" />
                          <span>{selectedItem.date}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center">
                        <FaTag className="text-cyan-600 mr-2" />
                        <span className="text-sm text-gray-700">
                          {selectedItem.category}
                        </span>
                      </div>

                      {selectedItem.reward && selectedItem.type === "lost" && (
                        <div className="mt-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg inline-block text-sm">
                          Reward: {selectedItem.reward}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedItem.identifyingFeatures && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">
                        Identifying Features:
                      </h4>
                      <p className="text-sm text-gray-700">
                        {selectedItem.identifyingFeatures}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email*
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Your email address"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Phone*
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Your phone number"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message*
                      </label>
                      <textarea
                        required
                        placeholder={
                          selectedItem.type === "lost"
                            ? "Please describe any identifying details about the item that only the owner would know..."
                            : "Please let the person know how they can retrieve their lost item..."
                        }
                        rows={5}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <FaInfoCircle className="text-blue-600 mt-0.5 mr-2" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium mb-1">
                            Contact Information
                          </p>
                          <p className="mb-1">
                            <strong>Posted by:</strong> {selectedItem.postedBy}
                          </p>
                          <p className="mb-1">
                            <strong>Email:</strong> {selectedItem.contact}
                          </p>
                          <p>
                            <strong>Phone:</strong> {selectedItem.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={closeContactModal}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg shadow-sm hover:shadow transition-all"
                      >
                        <FaComment className="inline-block mr-1.5" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;
