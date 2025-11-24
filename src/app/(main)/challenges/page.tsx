"use client";

import Image from "next/image";
import { useState } from "react";
import { Progress } from "@/components/ui";

type FilterType = "all" | "completed";

const myChallenges = [
  {
    id: 1,
    title: "2025 28-Day AI Challe...",
    progress: 0,
    totalDays: 28,
    image: "/challenges/ai-challenge.png",
    bgColor: "from-blue-50 to-green-50",
  },
  {
    id: 2,
    title: "Junior AI Challenge",
    progress: 0,
    totalDays: 28,
    image: "/challenges/junior-ai.png",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    title: "14-Day AI Side Gigs Ch...",
    progress: 0,
    totalDays: 14,
    image: "/challenges/side-gigs.png",
    bgColor: "from-purple-50 to-blue-50",
  },
];

const allChallenges = [
  {
    id: 1,
    title: "2025 28-Day AI Challenge",
    image: "/challenges/ai-challenge.png",
    bgColor: "from-blue-50 to-green-50",
  },
  {
    id: 2,
    title: "Junior AI Challenge",
    image: "/challenges/junior-ai.png",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    title: "14-Day AI Side Gigs Challenge",
    image: "/challenges/side-gigs.png",
    bgColor: "from-purple-50 to-blue-50",
  },
];

const ChallengesPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const showEmptyState = activeFilter === "completed";

  return (
    <div className="w-full min-h-screen bg-white mt-12">
      {/* Filter Tabs */}
      <div className="flex justify-center pt-8 pb-6">
        <div className="inline-flex gap-4">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-20 py-3 rounded-lg text-sm font-medium transition-all ${
              activeFilter === "all"
                ? "bg-white border-2 border-neutral-800 text-neutral-800"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-16 py-3 rounded-lg text-sm font-medium transition-all ${
              activeFilter === "completed"
                ? "bg-white border-2 border-neutral-800 text-neutral-800"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {showEmptyState ? (
        /* Empty State for Completed Challenges */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-64 h-64 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden">
            <div className="absolute top-8 left-12 text-6xl transform -rotate-12">✈️</div>
            <div className="absolute top-16 right-16 text-4xl transform rotate-45">🍃</div>
            <div className="absolute bottom-12 left-20 text-5xl transform rotate-12">✈️</div>
            <div className="absolute bottom-20 right-12 text-3xl">✈️</div>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            No completed challenges yet
          </h2>
          <p className="text-neutral-600 text-center">
            Dive into the challenges and unlock your potential
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* My Challenges Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              My challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${challenge.bgColor} flex items-center justify-center relative`}
                  >
                    <div className="text-6xl">🎯</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-neutral-900 mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Your progress: {challenge.progress} of {challenge.totalDays} Days
                    </p>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Challenges Section */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${challenge.bgColor} flex items-center justify-center relative`}
                  >
                    <div className="text-7xl">🎯</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-neutral-900 text-lg">
                      {challenge.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
