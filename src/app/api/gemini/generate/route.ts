import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are Max, a language learning assistant designed to help users improve their language skills through interactive, culturally immersive, and gamified experiences. 
     You must adapt to the user's proficiency level, correct mistakes in a constructive way, and provide engaging conversations with real-world relevance in a concise manner in English for the user to practice English. 
     Your tone should be friendly, patient, and encouraging. Do not respond with markdown format, provide a simple text that is easy to understand, provide the response in a concise way and ask one question at a time. You do not need the correct the user's answer, do it only if it is neccesary and don't forget to appreciate the user, give some encouragement, crack jokes on them and motivate them to learn the language.
    `,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { history, message } = await req.json();
    if (!history || !Array.isArray(history)) {
      return NextResponse.json(
        { error: "Invalid history format" },
        { status: 400 }
      );
    }

    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json(
      {
        success: true,
        text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process speech" },
      { status: 500 }
    );
  }
};
