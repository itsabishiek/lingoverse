import { Button } from "@/components/ui/button";
import { ChevronRight, Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full min-h-screen gap-7 md:gap-0">
      <div className="flex-1 flex flex-col items-start justify-center p-[15px] pt-0 sm:p-[30px] gap-[25px] sm:gap-[35px]">
        <div>
          <Link
            href="/pro"
            className="border border-accent rounded-[30px] w-fit flex items-center gap-[10px] px-[10px] py-[5px] bg-purple-400/70 hover:bg-purple-400/60 mb-[10px] transition duration-300"
          >
            <Languages />
            <span className="text-[14px]">Language Partner</span>
            <ChevronRight />
          </Link>

          <h1 className="leading-none !text-[28px] sm:!text-[48px] lg:!text-[58px] font-extrabold">
            Your AI Language Companion Awaits!
          </h1>
        </div>

        <p className="text-[16px] lg:text-[18px] text-secondary-100 leading-7">
          Chat, Learn, and Immerse Yourself in Real Conversations! Our
          AI-powered language partner adapts to your skill level, helps you with
          pronunciation, and makes learning fun with cultural insights and
          gamified challenges. Get started below and start speaking like a
          native today! 🌍✨
        </p>

        <Button asChild size="lg">
          <Link href="/talkToMax" className="font-semibold">
            Talk to Max!
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center pt-[30px] px-[15px] pb-0 sm:p-[30px]">
        <Image src="/hero.svg" alt="" width={500} height={500} />
      </div>
    </div>
  );
}
