import { Brain } from "lucide-react";
import React from "react";

type SuggestionCardProps = {
  data: { suggestion: string; prompt: string };
  handleMain: (msg: string) => void;
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  data,
  handleMain,
}) => {
  return (
    <div
      className="bg-secondary transition-all duration-300 hover:bg-secondary/50 rounded-lg p-2 flex flex-col gap-3 cursor-pointer"
      onClick={() => handleMain(data.prompt)}
    >
      <div className="w-7 h-7 rounded-full bg-[#9364FC] bg-gradient-to-tl from-[#9364FC] to-[#481184] flex items-center justify-center">
        <Brain size={20} />
      </div>
      <p className="text-[13px] text-muted-foreground font-semibold">
        {data.suggestion}
      </p>
    </div>
  );
};
export default SuggestionCard;
