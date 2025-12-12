"use client";

import { Button } from "@/components/ui/Button";
import { getWindow } from "@/lib/utils";
import { Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocation } from "react-use";

interface LearningProgressProps {
  category?: string;
  title?: string;
  progress?: number;
}

const LearningProgress = ({
  category = "AI MASTERY",
  title = "Earning Through ChatGPT-4 in SMM",
  progress = 25,
}: LearningProgressProps) => {
  const router = useRouter();
  const location = useLocation();
  const tWindow = getWindow();
  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setPathname(tWindow?.location?.pathname || '');
  },[tWindow])
  return (
    <div className="border-2 rounded-xl bg-white p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Illustration */}
        <div className="flex-shrink-0">
          <div className="w-52 h-52 bg-gradient-to-br rounded-lg flex items-center justify-center">
            <Image src="/guide.svg" alt="Guide" width={200} height={200} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 flex-1 pl-12">
          <div className="space-y-2">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
              {category}
            </p>
            <h2 className="text-2xl font-bold text-neutral-900">
              {title}
            </h2>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {pathname?.includes('home') ? <Button
              variant="defaultOutline"
              onClick={() => router.push("/guides")}
              className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold"
            >
              Other guides
            </Button> : <></>}
            <Button 
              variant="primary"
              onClick={() => router.push("/guides")}
              className="font-semibold px-6"
            >
              Continue learning
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex-shrink-0">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
