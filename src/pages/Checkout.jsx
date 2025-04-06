import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";

const Checkout = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [tokenNo, setTokenNo] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("2025-04-06 04:58:11");
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Current user
  const currentUser = "tanishyadav06012005";
  const userEmail = "tanishyadav06012005@gmail.com";

  // Update current date time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0") +
        " " +
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0");
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate total price
  
  const total = cartItems.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  // Handle order completion
  const handleCompleteOrder = () => {
    // Generate token based on current date and queue position
    const queuePosition = Math.floor(Math.random() * 15) + 1;
    const newToken = parseInt(`4${queuePosition.toString().padStart(3, "0")}`);
    setTokenNo(newToken);
    setIsOrdered(true);

    // Simulate sending email
    sendOrderConfirmationEmail(newToken);
  };

  // Simulate sending email to the user
  const sendOrderConfirmationEmail = (token) => {
    setSendingEmail(true);

    // Simulate API call with a delay
    setTimeout(() => {
      console.log(`Email sent to ${userEmail} with order token: ${token}`);
      setSendingEmail(false);
      setEmailSent(true);
    }, 2000);
  };

  // Handle return to home
  const handleReturnHome = () => {
    clearCart();
    navigate("/");
  };

  // Format date for receipt
  const formatReceiptDate = () => {
    const date = new Date();
    return `${date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })} at ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
      <Navbar cartItems={cartItems} onCartClick={() => {}} />

      <div className="container pt-28 pb-20">
        {/* Page Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/canteen"
            className="flex items-center gap-2 text-[#FF6600] hover:underline"
          >
            <FaArrowLeft />
            <span>Back to Menu</span>
          </Link>
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <div className="w-24"></div> {/* Empty div for balanced layout */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/60 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>Your cart is empty</p>
                <button
                  onClick={() => navigate("/canteen")}
                  className="mt-4 text-[#FF6600] hover:underline"
                >
                  Return to Menu
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size}{" "}
                            {item.quantity && item.quantity > 1
                              ? `× ${item.quantity}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        ₹{item.price * (item.quantity || 1)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <p>Total</p>
                    <p>₹{total}</p>
                  </div>
                </div>

                {!isOrdered && (
                  <button
                    onClick={handleCompleteOrder}
                    className="mt-6 bg-[#FF6600] text-white py-3 rounded-xl font-medium hover:bg-[#FF6600]/90 transition w-full"
                  >
                    Book Order
                  </button>
                )}
              </>
            )}
          </div>

          {/* Order Confirmation */}
          <div className="bg-white/60 rounded-2xl p-6 shadow-md flex flex-col">
            {isOrdered ? (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-6">Order Confirmed</h2>

                <div className="flex flex-col items-center mb-6 w-full">
                  {/* Token Display */}
                  <div className="bg-gradient-to-r from-[#FF6600] to-orange-500 text-white rounded-lg p-6 w-full max-w-md shadow-lg">
                    <div className="text-center mb-4">
                      <h3 className="text-sm uppercase tracking-wider font-medium opacity-80">
                        Your Order Token
                      </h3>
                      <div className="text-5xl font-bold my-3">#{tokenNo}</div>
                      <p className="text-sm opacity-80">
                        Present this token at the counter to collect your order
                      </p>
                    </div>
                    <div className="border-t border-white/20 pt-4 text-sm">
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{formatReceiptDate()}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Items:</span>
                        <span>{cartItems.length}</span>
                      </div>
                      <div className="flex justify-between mt-1 font-medium">
                        <span>Total:</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Receipt Status */}
                  <div className="mt-6 w-full max-w-md">
                    <div
                      className={`flex items-center p-4 rounded-lg ${
                        emailSent
                          ? "bg-green-50 border border-green-100"
                          : sendingEmail
                          ? "bg-blue-50 border border-blue-100"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      {emailSent ? (
                        <div className="flex items-center text-green-700">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <FaCheck className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Receipt Sent!</p>
                            <p className="text-sm text-green-600">
                              Order receipt sent. 
                            </p>
                          </div>
                        </div>
                      ) : sendingEmail ? (
                        <div className="flex items-center text-blue-700">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <FaSpinner className="text-blue-600 animate-spin" />
                          </div>
                          <div>
                            <p className="font-medium">Sending Receipt...</p>
                            <p className="text-sm text-blue-600">
                              Sending order details to {userEmail}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-700">
                          <div className="bg-gray-100 p-2 rounded-full mr-3">
                            <FaEnvelope className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">Email Receipt</p>
                            <p className="text-sm text-gray-600">
                              Receipt will be sent to {userEmail}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full p-4 bg-gray-100 rounded-lg text-left">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Current Date and Time (UTC):</p>
                      <p className="font-medium">{currentDateTime}</p>
                    </div>
                    <div>
                      <p className="text-sm">Ordered by:</p>
                      <p className="font-medium">{currentUser}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReturnHome}
                  className="mt-6 bg-[#FF6600] text-white py-3 rounded-xl font-medium hover:bg-[#FF6600]/90 transition w-full"
                >
                  Return to Menu
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <div className="bg-gray-100 p-8 rounded-xl w-full max-w-md">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Checkout Instructions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Review your order details and click "Book Order" to get your
                    order token and email receipt.
                  </p>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
                    <p>
                      Payment can be made at the counter when collecting your
                      order.
                    </p>
                    <p className="mt-2 flex items-center justify-center">
                      <FaEnvelope className="mr-2" />
                      Token will be shared on mail. 
                    </p>
                  </div>
                </div>

                <div className="p-4 mt-6 bg-gray-100 rounded-lg w-full">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Current Date and Time (UTC):</p>
                      <p className="font-medium">{currentDateTime}</p>
                    </div>
                    <div>
                      <p className="text-sm">User:</p>
                      <p className="font-medium">{currentUser}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
