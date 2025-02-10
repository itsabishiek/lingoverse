"use server";

import axios from "axios";

async function transcript(prevState: any, formData: FormData) {
  console.log("prevState", prevState);

  const file = formData.get("audio") as File;
  if (!file || file.size === 0) {
    return { sender: "", response: "No audio provided!" };
  }

  console.log("file", file);
  console.log("env", process.env.OPENAI_API_KEY);

  const frmData = new FormData();
  frmData.append("model", "whisper-1");
  frmData.append("file", file);

  let attempts = 0;
  const maxAttempts = 3;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  while (attempts < maxAttempts) {
    try {
      const whisperResponse = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        frmData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      console.log(whisperResponse.data.text);
      console.log("ended");

      return { sender: "", response: whisperResponse.data.text };
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn(`Rate limit hit. Retrying in ${2 ** attempts} seconds...`);
        await delay(2 ** attempts * 1000);
        attempts++;
      } else {
        throw error;
      }
    }
  }

  return { sender: "", response: "API rate limit exceeded. Try again later." };
}

export default transcript;
