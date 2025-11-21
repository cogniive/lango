"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const challenges = [
  {
    id: 1,
    title: "2025 28-Day AI Challenge",
    duration: "28 days",
    level: "Beginner",
    image: "/challenges/ai-challenge.png",
    bgColor: "from-blue-50 to-green-50",
  },
  {
    id: 2,
    title: "Junior AI Challenge",
    duration: "28 days",
    level: "Beginner",
    image: "/challenges/junior-ai.png",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    title: "14-Day AI Side Gigs Challenge",
    duration: "14 days",
    level: "Beginner",
    image: "/challenges/side-gigs.png",
    bgColor: "from-purple-50 to-blue-50",
  },
  {
    id: 4,
    title: "28-Day AI Challenge",
    duration: "28 days",
    level: "Beginner",
    image: "/challenges/28-day-ai.png",
    bgColor: "from-blue-50 to-cyan-50",
  },
  {
    id: 5,
    title: "No Code Challenge",
    duration: "14 days",
    level: "Beginner",
    image: "/challenges/no-code.png",
    bgColor: "from-blue-50 to-purple-50",
  },
];

const ChallengesSection = () => {
    const router = useRouter();
  return (
    <div className="w-full py-16 px-6">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">Challenges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              onClick={() => {router.push(`/challenges`)}}
              className="border-2 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white"
            >
              {/* Image Container */}
              <div className={`relative h-48 bg-gradient-to-br ${challenge.bgColor} flex items-center justify-center p-6`}>
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Placeholder for decorative elements - you can add actual images here */}
                  <div className="text-6xl">🎯</div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {challenge.duration} • {challenge.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;
