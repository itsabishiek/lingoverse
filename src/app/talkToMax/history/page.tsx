"use client";

import React, { useEffect, useState } from "react";

type HistoryProps = {};

type HistoryType = {
  date: string;
  conversation: {
    message: string;
    sender: string;
  }[];
};

const History: React.FC<HistoryProps> = () => {
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [chatId, setChatId] = useState(0);

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("conversationHistory") || "[]"
    );
    setHistory(history);
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="mx-auto w-full h-full md:max-w-3xl lg:max-w-[45rem] xl:max-w-[55rem] px-5 py-10">
        <div className="">
          <h1 className="text-xl font-bold">Chat History</h1>
          <p className="text-[16px] text-gray-500">
            The conversations that you made with max!
          </p>
        </div>

        <div className="mt-8 flex h-[calc(100vh-180px)] border border-l-gray-700">
          <div className="border-r overflow-auto border-l-gray-700 max-w-[250px] w-full">
            {history?.map((item: any, i: number) => (
              <div
                key={i}
                className="p-5 border-b border-gray-700 cursor-pointer"
                onClick={() => setChatId(i)}
              >
                {item.date}
              </div>
            ))}
          </div>
          <div className="flex-grow overflow-auto flex flex-col gap-4 w-full p-5">
            {history[chatId]?.conversation.map((item, i) => (
              <div
                className={`w-full flex items-center ${
                  item.sender === "user" && "justify-between"
                }`}
                key={i}
              >
                <div />
                <div
                  className={`max-w-[300px] p-3 rounded-md ${
                    item.sender === "max" ? "bg-slate-800" : "bg-primary"
                  }`}
                >
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default History;
