import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq();
async function main() {
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream("1743885809931ee084v98-voicemaker.in-speech.mp3"),
    model: "whisper-large-v3-turbo",
    language: "en",
    response_format: "verbose_json",
  });
  console.log(transcription.text);
}
main();    
    