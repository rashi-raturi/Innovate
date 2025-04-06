import React, { useState, useEffect, useRef } from "react";
import {
  SpeechRecognitionService,
  parseVoiceOrder,
} from "../../utils/speechRecognition";
import {
  FaUtensils,
  FaMicrophoneSlash,
  FaShoppingCart,
  FaSpinner,
  FaVolumeUp,
  FaRobot,
  FaHotjar,
} from "react-icons/fa";

const VoiceOrder = ({ onAddToCart }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [recognizedItems, setRecognizedItems] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const speechService = useRef(null);

  // Current date time and user
  const currentDateTime = "2025-04-06 04:36:08";
  const currentUser = "tanishyadav06012005";

  // Initialize speech recognition service
  useEffect(() => {
    speechService.current = new SpeechRecognitionService(
      // Result handler
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          setFinalTranscript(text);
          processOrder(text);
        }
      },
      // Error handler
      (errorMessage) => {
        setError(errorMessage);
        setIsListening(false);
      },
      // End handler
      () => {
        setIsListening(false);
      }
    );

    return () => {
      if (speechService.current?.isListening) {
        speechService.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!speechService.current) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    setError("");
    setSuccessMessage("");

    if (isListening) {
      speechService.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setFinalTranscript("");
      speechService.current.start();
      setIsListening(true);
    }
  };

  const processOrder = (text) => {
    setIsProcessing(true);

    try {
      // Parse the voice command to extract items and quantities
      const items = parseVoiceOrder(text);
      setRecognizedItems(items);

      if (items.length === 0) {
        speak("I didn't catch any menu items. Please try again.");
        setError(
          "No menu items recognized. Try speaking more clearly or check if the item is on the menu."
        );
      } else {
        // Create sample prices for demo
        const menuPrices = {
          // Featured top items
          "butter chicken thali": 280,
          "paneer butter masala": 210,
          "chicken dum biryani": 230,
          "masala dosa": 110,
          "hakka noodles": 150,
          "chole bhature": 120,
          "veg deluxe thali": 250,
          "south indian platter": 270,
          "mughlai special": 290,

          // Regular menu items
          "butter chicken": 250,
          "chicken tikka masala": 270,
          "chicken biryani": 180,
          "mutton biryani": 220,
          "paneer tikka": 180,
          "shahi paneer": 190,
          "kadai paneer": 180,
          "matar paneer": 170,
          "palak paneer": 180,
          "dal makhani": 150,
          "chana masala": 140,
          "rajma chawal": 160,
          "aloo gobi": 140,
          "malai kofta": 190,
          "butter naan": 40,
          "garlic naan": 50,
          "tandoori roti": 25,
          paratha: 40,
          "aloo paratha": 60,
          "gobi paratha": 60,
          "veg biryani": 160,
          "egg biryani": 170,
          "jeera rice": 110,
          "veg pulao": 130,

          "plain dosa": 70,
          "mysore masala dosa": 110,
          uttapam: 90,
          idli: 50,
          vada: 50,
          sambar: 40,
          "coconut chutney": 30,
          "medu vada": 60,
          "rava dosa": 100,
          "paper dosa": 90,
          upma: 60,
          "lemon rice": 80,
          "tomato rice": 90,
          "bisi bele bath": 100,
          pongal: 80,
          appam: 70,
          rasam: 50,

          "pav bhaji": 80,
          "vada pav": 40,
          samosa: 20,
          kachori: 25,
          "bhel puri": 50,
          "sev puri": 60,
          "dahi puri": 70,
          "pani puri": 50,
          "aloo tikki": 40,
          dabeli: 40,
          "misal pav": 70,
          "dahi vada": 60,
          chaat: 70,
          frankie: 90,
          "ragda patties": 60,
          jalebi: 50,
          "bombay sandwich": 60,
          "veg cutlet": 50,

          "masala chai": 20,
          "cutting chai": 15,
          "filter coffee": 30,
          lassi: 50,
          "mango lassi": 70,
          "sweet lassi": 60,
          "salted lassi": 50,
          chaas: 30,
          "nimbu pani": 30,
          jaljeera: 40,
          thandai: 60,
          "badam milk": 70,
          "rose milk": 60,
          "coconut water": 40,
          "fresh lime soda": 40,
          jigarthanda: 80,

          "gulab jamun": 40,
          rasgulla: 40,
          rasmalai: 60,
          kheer: 60,
          shrikhand: 70,
          "gajar ka halwa": 80,
          kulfi: 50,
          phirni: 60,
          ladoo: 30,
          barfi: 40,
          "mysore pak": 50,
          payasam: 70,
          rabri: 70,
          imarti: 50,
          sandesh: 60,
          peda: 40,
          modak: 50,
          malpua: 60,

          "schezwan noodles": 130,
          manchurian: 140,
          "fried rice": 110,
          "chilli paneer": 150,
          "chilli chicken": 170,
          "spring roll": 80,
          "manchow soup": 90,
          "hot and sour soup": 90,
          "honey chilli potato": 120,
          "dragon chicken": 180,

          "veg sandwich": 60,
          "grilled sandwich": 80,
          "cheese sandwich": 90,
          "french fries": 80,
          pasta: 140,
          pizza: 220,
          burger: 90,
          "veg burger": 80,
          "chicken burger": 120,
          "cold coffee": 70,
          "ice cream": 60,
          milkshake: 80,
          "chocolate shake": 90,
          "strawberry shake": 90,
          brownie: 70,
        };

        // Add items to cart
        items.forEach((item) => {
          const price = menuPrices[item.name] || 100; // Default price if not found

          onAddToCart({
            name: item.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            price: price,
            quantity: item.quantity,
            size: "Regular",
            image: `https://source.unsplash.com/100x100/?${item.name.replace(
              /\s+/g,
              "-"
            )}`,
          });
        });

        // Create success message
        const itemsText = items
          .map((item) => `${item.quantity} ${item.name}`)
          .join(", ");
        const message = `Added to cart: ${itemsText}`;
        setSuccessMessage(message);

        // Speak confirmation
        speak(`Added ${itemsText} to your cart.`);
      }
    } catch (err) {
      console.error("Error processing order:", err);
      setError("Error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Text-to-speech feedback
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="sticky top-20 z-40 flex justify-center">
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-full px-6 py-3 flex items-center gap-4 border border-orange-200">
        <span className="text-gray-800 font-medium">Order with your voice</span>
        {/* Main button */}
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full shadow-md transition-all duration-300 ${
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-gradient-to-r from-[#FF6600] to-orange-600 hover:from-[#FF6600] hover:to-orange-700"
          }`}
          title={isListening ? "Tap to stop" : "Tap to speak your order"}
        >
          {isListening ? (
            <FaHotjar className="text-white text-xl" />
          ) : (
            <FaUtensils className="text-white text-xl" />
          )}
        </button>
        <span className="text-xs text-gray-500 hidden md:inline-block">
          {isListening
            ? "I'm listening..."
            : 'Try: "Add butter chicken thali & south indian platter"'}
        </span>
      </div>

      {/* Popup when listening or showing results */}
      {(isListening || transcript || error || successMessage) && (
        <div className="absolute top-16 right-0 left-0 mx-auto w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6600] to-orange-600 p-3 text-white">
            <h3 className="font-bold text-lg flex items-center">
              <FaRobot className="mr-2" />
              Voice Food Ordering
            </h3>
          </div>

          {/* Content */}
          <div className="p-4">
            {isListening && (
              <div className="mb-3">
                <div className="flex justify-center mb-2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-8 bg-[#FF6600] rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-8 bg-[#FF6600] rounded-full animate-pulse"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-8 bg-[#FF6600] rounded-full animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-8 bg-[#FF6600] rounded-full animate-pulse"
                      style={{ animationDelay: "450ms" }}
                    ></div>
                    <div
                      className="w-2 h-8 bg-[#FF6600] rounded-full animate-pulse"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm text-center italic">
                  Listening... say your order
                </p>
                {transcript && (
                  <div className="mt-2 p-2 bg-gray-100 rounded-lg text-gray-800 text-sm">
                    "{transcript}"
                  </div>
                )}
              </div>
            )}

            {isProcessing && (
              <div className="flex justify-center mb-3">
                <FaSpinner className="text-[#FF6600] text-2xl animate-spin" />
              </div>
            )}

            {error && (
              <div className="mb-3 p-2 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-3 p-2 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-green-600 text-sm">{successMessage}</p>
              </div>
            )}

            {recognizedItems.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-800 mb-1">
                  Recognized Items:
                </h4>
                <ul className="bg-gray-50 rounded-lg p-2">
                  {recognizedItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span>{item.name}</span>
                      <span className="font-medium">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center mt-2">
              Try saying: "Add veg deluxe thali and mughlai special"
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between">
            {!isListening && (
              <button
                onClick={toggleListening}
                className="px-4 py-2 bg-gradient-to-r from-[#FF6600] to-orange-600 hover:from-[#FF6600] hover:to-orange-700 text-white rounded-lg flex items-center text-sm"
              >
                <FaUtensils className="mr-2" />
                {finalTranscript ? "Try Again" : "Start Speaking"}
              </button>
            )}

            {finalTranscript && !isListening && (
              <button
                onClick={() => {
                  setTranscript("");
                  setFinalTranscript("");
                  setRecognizedItems([]);
                  setError("");
                  setSuccessMessage("");
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm"
              >
                Clear
              </button>
            )}
          </div>

          {/* User Info */}
          {(successMessage || error) && (
            <div className="border-t border-gray-200 p-2 bg-gray-50 text-xs text-gray-500">
              <p>Current Date and Time (UTC): {currentDateTime}</p>
              <p>User: {currentUser}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceOrder;
