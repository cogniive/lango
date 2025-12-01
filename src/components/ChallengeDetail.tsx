"use client";

import { CheckCircle2, Play } from "lucide-react";
import { Button } from "./ui";

const ChallengeDetail = () => {
  const days = [
    { id: 1, title: "Day 1: Getting Started with AI", completed: true },
    { id: 2, title: "Day 2: AI Fundamentals", completed: true },
    { id: 3, title: "Day 3: AI in Everyday Life", completed: true },
    { id: 4, title: "Day 4: AI Tools and Platforms", completed: false },
    { id: 5, title: "Day 5: AI for Productivity", completed: false },
    { id: 6, title: "Day 6: AI and Data", completed: false },
    { id: 7, title: "Day 7: AI Project Day", completed: false },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          2025 28-Day AI Challenge
        </h1>
        <p className="text-gray-600">
          Complete daily challenges to master AI in just 28 days
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {days.map((day) => (
          <div
            key={day.id}
            className={`flex items-center p-4 rounded-lg border ${
              day.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mr-4">
              {day.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            <span className={`font-medium ${day.completed ? 'text-green-700' : 'text-gray-700'}`}>
              {day.title}
            </span>
            {!day.completed && (
              <Button variant="secondary" size="sm" className="ml-auto">
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="px-8">
          Start now
        </Button>
      </div>
    </div>
  );
};

export default ChallengeDetail;
