import { Brain, MicVocal } from "lucide-react";
import React from "react";

type SuggestionCardProps = {
  suggestion: string;
  handleMain: (msg: string) => void;
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  handleMain,
}) => {
  return (
    <div
      className="bg-secondary transition-all duration-300 hover:bg-secondary/50 rounded-lg p-2 flex flex-col gap-3 cursor-pointer"
      onClick={() => handleMain(suggestion)}
    >
      <div className="w-7 h-7 rounded-full bg-[#9364FC] bg-gradient-to-tl from-[#9364FC] to-[#481184] flex items-center justify-center">
        <Brain size={20} />
      </div>
      <p className="text-[13px] text-muted-foreground font-semibold">
        {suggestion}
      </p>
    </div>
  );
};
export default SuggestionCard;
