"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

type LanguageContextType = {
  selectedLang: SelectedLangType;
  changeLang: (lang: SelectedLangType) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageContextProviderProps = {
  children: React.ReactNode;
};

export const useLanguageManager = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguageManager must be used within a LanguageManager");
  }
  return context;
};

export const languageOptions: Record<string, string> = {
  "en-US": "English",
  "ta-IN": "Tamil",
  "hi-IN": "Hindi",
  "fr-FR": "Français",
  "zh-CN": "中文",
};

export type SelectedLangType = "en-US" | "ta-IN" | "hi-IN" | "fr-FR" | "zh-CN";

const LanguageContextProvider: React.FC<LanguageContextProviderProps> = ({
  children,
}) => {
  const [selectedLang, setSelectedLang] = useState<SelectedLangType>("en-US");
  const router = useRouter();

  const changeLang = (lang: SelectedLangType) => {
    setSelectedLang(lang);
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ selectedLang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContextProvider;
