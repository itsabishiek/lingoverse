import { MicVocal } from "lucide-react";
import React from "react";

type TalkComponentProps = {
  userCallMax: () => void;
  userStartSpeak: () => void;
  userStopSpeak: () => void;
  listening: boolean;
  isCalling: boolean;
  isMaxSpeaking: boolean;
};

const TalkComponent: React.FC<TalkComponentProps> = ({
  isCalling,
  isMaxSpeaking,
  listening,
  userCallMax,
  userStartSpeak,
  userStopSpeak,
}) => {
  if (!isCalling) {
    return (
      <div
        className="flex items-center justify-between bg-accent p-2 rounded-full cursor-pointer"
        onClick={userCallMax}
      >
        <p className="ml-3 font-[500]">Tap here to chat with Max!</p>

        <div className="w-12 h-12 rounded-full bg-[#9364FC] bg-gradient-to-tl from-[#9364FC] to-[#481184] flex items-center justify-center">
          <MicVocal />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <MaxMicAnimate
        listening={listening}
        animate={listening}
        userStartSpeak={userStartSpeak}
        userStopSpeak={userStopSpeak}
        isMaxSpeaking={isMaxSpeaking}
      />
    </div>
  );
};
export default TalkComponent;

const MaxMicAnimate = ({
  listening,
  animate,
  userStartSpeak,
  userStopSpeak,
  isMaxSpeaking,
}: {
  listening: boolean;
  animate: boolean;
  userStartSpeak: () => void;
  userStopSpeak: () => void;
  isMaxSpeaking: boolean;
}) => {
  return (
    <div
      className="relative w-24 h-24 bg-black rounded-full overflow-hidden cursor-pointer"
      onClick={() => {
        if (listening) {
          userStopSpeak();
        } else {
          userStartSpeak();
        }
      }}
    >
      {/* Waveform Circles */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          animate && "animate-pulse"
        }`}
      >
        <div
          className={`w-20 h-20 rounded-full border-2 ${
            isMaxSpeaking ? "border-input" : "border-purple-500"
          } opacity-50`}
        ></div>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          animate && "animate-pulse delay-100"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full border-2 ${
            isMaxSpeaking ? "border-input" : "border-purple-500"
          } opacity-75`}
        ></div>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          animate && "animate-pulse delay-200"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full border-2 ${
            isMaxSpeaking ? "border-input" : "border-purple-500"
          }`}
        ></div>
      </div>

      {/* Microphone Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {listening ? (
          <span className="text-xl">🟪</span>
        ) : (
          <span className="text-2xl">🎤</span>
        )}
      </div>

      {/* Gradient Overlay (Optional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/50 via-purple-800/20 to-transparent opacity-80"></div>
    </div>
  );
};
