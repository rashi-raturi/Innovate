const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config()

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    systemInstruction: "Prompt:\n\nYou are a personalized meal recommendation assistant.\n\nContext:\nThe user has previously consumed the following meals:\n{previous_meals}\n\nThe following meals are currently available:\n{available_meals}\n\nTask:\nBased on the user's previous meal records, recommend at least 3 meals from the available options that best align with their preferences. If patterns like cuisine type, ingredients, or nutritional profile are noticeable, prioritize meals that match those patterns.\n\nReturn only the meal names in a comma-separated list.",
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
};
  

const getRecs = async (meals_data) => {
    const chatSession = model.startChat({generationConfig});
    
    const result = await chatSession.sendMessage(JSON.stringify(meals_data));
    let responseText = await result.response.text()

    console.log(responseText)

    return responseText
}


module.exports = {
    getRecs
}