"use client";

import SuggestionCard from "@/components/SuggestionCard";
import TalkComponent from "@/components/TalkComponent";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaxCommands, MaxSuggestions } from "@/constants";
import { useGlobalManager } from "@/contexts/GlobalContextProvider";
import {
  useLanguageManager,
  SelectedLangType,
} from "@/contexts/LanguageContextProvider";
import { History } from "lucide-react";
import Link from "next/link";
import "regenerator-runtime/runtime";

type TalkToMaxProps = {};

const TalkToMax: React.FC<TalkToMaxProps> = () => {
  const { selectedLang, changeLang } = useLanguageManager();
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-semibold text-2xl pb-2">
              Hey, <b className="text-primary">Abishiek!</b>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              {MaxCommands[selectedLang].aboutMax}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={selectedLang}
              onValueChange={(lang: SelectedLangType) => changeLang(lang)}
              disabled={conversation.length > 0}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="en-US">English</SelectItem>
                  <SelectItem value="ta-IN">Tamil</SelectItem>
                  <SelectItem value="hi-IN">Hindi</SelectItem>
                  <SelectItem value="fr-FR">Français</SelectItem>
                  <SelectItem value="zh-CN">中文</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {isCalling && (
              <Button variant="destructive" onClick={endCall}>
                Hang up
              </Button>
            )}

            <Button variant="outline" title="History" asChild>
              <Link href="/talkToMax/history">
                <History />
              </Link>
            </Button>
          </div>
        </div>

        {conversation.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {MaxSuggestions[selectedLang].map((data, i) => (
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
