import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center p-[25px]">
      <h1>Lingoverse</h1>

      <Button asChild>
        <Link href="/talkToMax">Talk to Max</Link>
      </Button>
    </div>
  );
}
