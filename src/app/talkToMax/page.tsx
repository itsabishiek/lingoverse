"use client";

import SuggestionCard from "@/components/SuggestionCard";
import TalkComponent from "@/components/TalkComponent";
import { Button } from "@/components/ui/button";
import { MaxSuggestions } from "@/constants";
import { useGlobalManager } from "@/contexts/GlobalContextProvider";
import "regenerator-runtime/runtime";

type TalkToMaxProps = {};

const TalkToMax: React.FC<TalkToMaxProps> = () => {
  const {
    userCallMax,
    userStartSpeak,
    userStopSpeak,
    listening,
    isCalling,
    endCall,
    handleMain,
    conversation,
    isMaxSpeaking,
  } = useGlobalManager();

  return (
    <div className="w-full h-screen">
      <div className="mx-auto w-full h-full md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] flex flex-col justify-between px-5 py-10">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-2xl pb-2">
              Hey, <b className="text-primary">Abishiek!</b>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Whether you want to chat, improve pronunciation, or explore
              cultural gems, I’m here to make learning fun and engaging.
            </p>
          </div>

          {isCalling && (
            <Button variant="destructive" onClick={endCall}>
              Hang up
            </Button>
          )}
        </div>

        {conversation.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {MaxSuggestions.map((data, i) => (
              <SuggestionCard key={i} data={data} handleMain={handleMain} />
            ))}
          </div>
        )}

        {conversation.length > 0 && (
          <div className="text-center">
            <p>{conversation[conversation.length - 1].message}</p>
          </div>
        )}

        <TalkComponent
          isCalling={isCalling}
          isMaxSpeaking={isMaxSpeaking}
          listening={listening}
          userCallMax={userCallMax}
          userStartSpeak={userStartSpeak}
          userStopSpeak={userStopSpeak}
        />
      </div>
    </div>
  );
};
export default TalkToMax;
