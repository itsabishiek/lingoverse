export const mimeType = "audio/webm";

export const MaxCommands = {
  intro:
    "Hey there! let’s make learning exciting! You can chat with me like a friend, practice your pronunciation, or even play language games. How would you like to start?",
  browserNotCompactible:
    "Your browser does not support speech recognition. Try Chrome or Edge browser!",
};

export const MaxSuggestions = [
  "Ordering Food at a Café ☕ – Practice ordering like a local!",
  "Common Travel Phrases ✈️ – Essential phrases for your next trip.",
  "Shopping & Bargaining 🛍️ – Learn how to negotiate prices.",
  "AI-Powered Riddle Game! 🤔 – Solve language-based riddles.",
];

// storing them for temp
// const handleMain = async (transcript: string) => {
//   SpeechRecognition.stopListening();
//   const audio = new Audio();

//   try {
//     const response = await axios.post(
//       `/api/gemini/generate`,
//       { transcript },
//       {
//         responseType: "blob",
//       }
//     );

//     if (transcript !== "") {
//       resetTranscript();
//     }

//     const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
//     audio.src = URL.createObjectURL(audioBlob);
//     audio.play();
//   } catch (error) {
//     console.error("TTS request failed:", error);
//   }
// };
