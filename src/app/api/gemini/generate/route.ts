import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { history, message, systemInstruction } = await req.json();
    if (!history || !Array.isArray(history) || !systemInstruction) {
      return NextResponse.json(
        { error: "Invalid history format" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

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
}
