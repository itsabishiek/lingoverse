"use client";

import "regenerator-runtime/runtime";
import { MaxCommands } from "@/constants";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useLanguageManager } from "./LanguageContextProvider";

interface GlobalContextType {
  userCallMax: () => void;
  userStartSpeak: () => void;
  userStopSpeak: () => void;
  listening: boolean;
  isCalling: boolean;
  endCall: () => void;
  handleMain: (message: string) => void;
  conversation: ConversationType[];
  isMaxSpeaking: boolean;
}

export interface ConversationType {
  message: string;
  sender: string;
}

export interface ConversationHistoryType {
  date: string;
  conversation: ConversationType[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const useGlobalManager = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalManager must be used within a GlobalManager");
  }
  return context;
};

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const isUserCalling = useRef(false);
  const isMaxSpeaking = useRef(false);

  const commands = [
    {
      command: ["*"],
      callback: (command: string) => handleMain(command),
    },
  ];

  const [isBotSpeaking, setIsBotSpeaking] = useState(isMaxSpeaking.current);
  const [isCalling, setIsCalling] = useState(isUserCalling.current);
  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    commands,
  });
  const [userSpeechSynthesis, setUserSpeechSynthesis] =
    useState<SpeechSynthesis>();
  const [userLocalStorage, setUserLocalStorage] = useState<Storage>();

  const { selectedLang } = useLanguageManager();
  // const defaultIntroduction = MaxCommands.intro;

  const [conversation, setConversation] = useState<ConversationType[]>([]);

  const handleMaxSpeechStart = () => {
    isMaxSpeaking.current = true;
    setIsBotSpeaking(true);
    SpeechRecognition.stopListening();
  };

  const handleMaxSpeechEnd = () => {
    isMaxSpeaking.current = false;
    setIsBotSpeaking(false);

    if (isUserCalling.current) {
      SpeechRecognition.startListening({ language: selectedLang });
    }
  };

  const maxSpeak = (msg: string) => {
    if (isMaxSpeaking.current || !userSpeechSynthesis || !isUserCalling.current)
      return;

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      userSpeechSynthesis.speak(
        new SpeechSynthesisUtterance(
          MaxCommands[selectedLang].browserNotCompactible
        )
      );
      return;
    }

    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = selectedLang;
    utterance.onstart = handleMaxSpeechStart;
    utterance.onend = handleMaxSpeechEnd;
    userSpeechSynthesis.speak(utterance);
  };

  async function getMaxReply(
    conversations: ConversationType[],
    message: string
  ) {
    try {
      const geminiFormattedMsgs = conversations.map((conversation) => {
        return {
          role: conversation.sender === "user" ? "user" : "model",
          parts: [{ text: conversation.message }],
        };
      });

      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: geminiFormattedMsgs,
          message,
          systemInstruction: MaxCommands[selectedLang].systemInstructions,
        }),
      });

      if (!response.ok) throw new Error("Gemini API request failed");

      const result = await response.json();
      const modelResponse = result.text || "No response received.";
      return modelResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleMain = async (msg: string) => {
    if (!msg) return;

    if (!isUserCalling.current) {
      isUserCalling.current = true;
      setIsCalling(isUserCalling.current);
    }
    if (isMaxSpeaking.current) {
      userSpeechSynthesis?.cancel();
      isMaxSpeaking.current = false;
      setIsBotSpeaking(false);
    }

    const maxReply = await getMaxReply(conversation, msg);

    setConversation([
      ...conversation,
      {
        message: msg,
        sender: "user",
      },
      {
        message: maxReply,
        sender: "max",
      },
    ]);

    maxSpeak(maxReply);
  };

  const userStartSpeak = () => {
    SpeechRecognition.startListening({ language: selectedLang });

    if (transcript !== "") {
      resetTranscript();
    }
  };

  const userStopSpeak = () => {
    SpeechRecognition.stopListening();
  };

  const userCallMax = async () => {
    isUserCalling.current = true;
    setIsCalling(isUserCalling.current);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setConversation([
        ...conversation,
        {
          message: MaxCommands[selectedLang].browserNotCompactible,
          sender: "max",
        },
      ]);
      isUserCalling.current = false;
      setIsCalling(isUserCalling.current);
      return;
    }

    const defaultMessage = MaxCommands[selectedLang].firstMessage;

    const maxReply = await getMaxReply(conversation, defaultMessage);

    setConversation([
      ...conversation,
      {
        message: defaultMessage,
        sender: "user",
      },
      {
        message: maxReply,
        sender: "max",
      },
    ]);

    maxSpeak(maxReply);
  };

  const updateConversationHistory = () => {
    if (userLocalStorage && conversation.length > 1) {
      const storage = userLocalStorage.getItem("conversationHistory")
        ? JSON.parse(userLocalStorage.getItem("conversationHistory") as string)
        : [];
      const newConversationHistory: ConversationHistoryType[] = [
        ...storage,
        { date: new Date(), conversation },
      ];
      userLocalStorage.setItem(
        "conversationHistory",
        JSON.stringify(newConversationHistory)
      );
    }
  };

  const resetConverasation = () => {
    setConversation([]);
  };

  const hangUp = () => {
    SpeechRecognition.stopListening();
    resetConverasation();

    isUserCalling.current = false;
    setIsCalling(isUserCalling.current);
    if (isMaxSpeaking.current) {
      userSpeechSynthesis?.cancel();
      isMaxSpeaking.current = false;
      setIsBotSpeaking(false);
    }

    SpeechRecognition.abortListening();
  };

  const endCall = () => {
    hangUp();
    updateConversationHistory();
  };

  useEffect(() => {
    setUserSpeechSynthesis(window.speechSynthesis);
    setUserLocalStorage(localStorage);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        userCallMax,
        userStartSpeak,
        userStopSpeak,
        listening,
        isCalling,
        endCall,
        handleMain,
        conversation,
        isMaxSpeaking: isBotSpeaking,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;
