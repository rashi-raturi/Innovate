// Speech recognition utility
export class SpeechRecognitionService {
  constructor(onResult, onError, onEnd, language = "en-US") {
    this.recognition = null;
    this.isListening = false;
    this.onResult = onResult;
    this.onError = onError;
    this.onEnd = onEnd;
    this.language = language;

    // Check for browser support
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      this.onError(
        "Speech recognition is not supported in this browser. Try Chrome, Edge, or Safari."
      );
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.setupRecognition();
  }

  setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = this.language;

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      const isFinal = event.results[0].isFinal;
      this.onResult(transcript, isFinal);
    };

    this.recognition.onerror = (event) => {
      let errorMessage = "An error occurred with speech recognition";

      if (event.error === "no-speech") {
        errorMessage = "No speech was detected. Try again.";
      } else if (event.error === "aborted") {
        errorMessage = "Speech recognition was aborted";
      } else if (event.error === "network") {
        errorMessage = "Network error occurred. Please check your connection.";
      } else if (event.error === "not-allowed") {
        errorMessage =
          "Microphone access was denied. Please allow microphone access.";
      }

      this.onError(errorMessage);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.onEnd();
    };
  }

  start() {
    if (!this.recognition) return;

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error("Speech recognition error:", error);
      this.onError("Failed to start speech recognition");
    }
  }

  stop() {
    if (!this.recognition) return;

    try {
      this.recognition.stop();
      this.isListening = false;
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }

  isSupported() {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  }
}

// Order parsing utilities
export const parseVoiceOrder = (transcript) => {
  // Convert to lowercase for easier matching
  const text = transcript.toLowerCase();

  // Common patterns for food ordering
  const quantityPattern =
    /(\d+|one|two|three|four|five|six|seven|eight|nine|ten)/g;

  // TopList featured items (added the top menu items that will be highlighted)
  const topItems = [
    "butter chicken thali",
    "paneer butter masala",
    "chicken dum biryani",
    "masala dosa",
    "hakka noodles",
    "chole bhature",
    "veg deluxe thali",
    "south indian platter",
    "mughlai special",
  ];

  // All menu items including the top items
  const menuItems = [
    // TopList items
    ...topItems,

    // North Indian dishes
    "butter chicken",
    "chicken tikka masala",
    "chicken biryani",
    "mutton biryani",
    "paneer tikka",
    "shahi paneer",
    "kadai paneer",
    "matar paneer",
    "palak paneer",
    "dal makhani",
    "chana masala",
    "rajma chawal",
    "chole bhature",
    "aloo gobi",
    "malai kofta",
    "butter naan",
    "garlic naan",
    "tandoori roti",
    "paratha",
    "aloo paratha",
    "gobi paratha",
    "veg biryani",
    "egg biryani",
    "jeera rice",
    "veg pulao",

    // South Indian dishes
    "masala dosa",
    "plain dosa",
    "mysore masala dosa",
    "uttapam",
    "idli",
    "vada",
    "sambar",
    "coconut chutney",
    "medu vada",
    "rava dosa",
    "paper dosa",
    "upma",
    "lemon rice",
    "tomato rice",
    "bisi bele bath",
    "pongal",
    "appam",
    "rasam",

    // Street food
    "pav bhaji",
    "vada pav",
    "samosa",
    "kachori",
    "bhel puri",
    "sev puri",
    "dahi puri",
    "pani puri",
    "aloo tikki",
    "dabeli",
    "misal pav",
    "dahi vada",
    "chaat",
    "frankie",
    "ragda patties",
    "jalebi",
    "bombay sandwich",
    "veg cutlet",

    // Beverages
    "masala chai",
    "cutting chai",
    "filter coffee",
    "lassi",
    "mango lassi",
    "sweet lassi",
    "salted lassi",
    "chaas",
    "nimbu pani",
    "jaljeera",
    "thandai",
    "badam milk",
    "rose milk",
    "coconut water",
    "fresh lime soda",
    "jigarthanda",

    // Desserts
    "gulab jamun",
    "rasgulla",
    "rasmalai",
    "kheer",
    "shrikhand",
    "jalebi",
    "gajar ka halwa",
    "kulfi",
    "phirni",
    "ladoo",
    "barfi",
    "mysore pak",
    "payasam",
    "rabri",
    "imarti",
    "sandesh",
    "peda",
    "modak",
    "malpua",

    // Indo-Chinese
    "hakka noodles",
    "schezwan noodles",
    "manchurian",
    "fried rice",
    "chilli paneer",
    "chilli chicken",
    "spring roll",
    "manchow soup",
    "hot and sour soup",
    "honey chilli potato",
    "dragon chicken",

    // Other campus favorites
    "veg sandwich",
    "grilled sandwich",
    "cheese sandwich",
    "french fries",
    "pasta",
    "pizza",
    "burger",
    "veg burger",
    "chicken burger",
    "cold coffee",
    "ice cream",
    "milkshake",
    "chocolate shake",
    "strawberry shake",
    "brownie",
  ];

  // Find items in the transcript
  const items = [];
  let foundItems = [];

  // First look for menu items in the transcript
  menuItems.forEach((item) => {
    if (text.includes(item)) {
      foundItems.push(item);
    }
  });

  // Convert number words to digits
  const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  // Try to match quantities with food items
  foundItems.forEach((item) => {
    // Default quantity
    let quantity = 1;

    // Look for quantity pattern before the item
    const indexOfItem = text.indexOf(item);
    const textBeforeItem = text.substring(0, indexOfItem);

    // Find any quantities mentioned
    const quantityMatches = textBeforeItem.match(quantityPattern);

    if (quantityMatches) {
      const lastQuantity = quantityMatches[quantityMatches.length - 1];
      quantity = numberMap[lastQuantity] || parseInt(lastQuantity, 10) || 1;
    }

    items.push({
      name: item,
      quantity: quantity,
    });
  });

  return items;
};
