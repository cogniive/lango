"use client";

import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyStreaksProps {
  completedDays?: number[];
}

const WeeklyStreaks = ({ completedDays = [] }: WeeklyStreaksProps) => {
  const currentDay = new Date().getDay(); 
  
  const days = [
    { name: "Tue", index: 2 },
    { name: "Wed", index: 3 },
    { name: "Thu", index: 4 },
    { name: "Fri", index: 5 },
    { name: "Sat", index: 6 },
  ];

  const isDayCompleted = (dayIndex: number) => {
    return completedDays.includes(dayIndex);
  };

  const isCurrentDay = (dayIndex: number) => {
    return currentDay === dayIndex;
  };

  return (
    <div className="border-2 rounded-xl bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row p-6">
        {/* Text Container */}
        <div className="space-y-2 flex-1">
          <h3 className="text-blue-500 font-bold text-sm uppercase tracking-wide">
            Weekly Streaks
          </h3>
          <p className="text-neutral-700 font-semibold text-lg">
            Help you build learning habit
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-5 h-5 fill-neutral-700 stroke-neutral-700" />
            <span>
              Finish <span className="font-bold">1 lesson</span> to begin your streak
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 md:border-t-0 md:border-l-2 border-neutral-200" />

        {/* Days Container */}
        <div className="flex justify-between gap-2 flex-1">
          {days.map((day) => {
            const completed = isDayCompleted(day.index);
            const current = isCurrentDay(day.index);
            
            return (
              <div
                key={day.name}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Circle Badge Border */}
                  <svg
                    viewBox="0 0 100 100"
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all",
                      completed && "stroke-green-500 fill-green-500",
                      current && !completed && "stroke-blue-500 fill-white",
                      !completed && !current && "stroke-neutral-300 fill-white"
                    )}
                    strokeWidth="2"
                  >
                    <circle cx="50" cy="50" r="40" />
                  </svg>
                  
                  {/* Icon */}
                  {completed ? (
                    <Zap className="w-7 h-7 fill-white stroke-white relative z-10" />
                  ) : current ? (
                    <Zap className="w-7 h-7 fill-blue-500 stroke-blue-500 relative z-10" />
                  ) : (
                    <Zap className="w-7 h-7 fill-neutral-400 stroke-neutral-400 relative z-10" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    completed && "text-green-500",
                    current && !completed && "text-blue-500",
                    !completed && !current && "text-neutral-400"
                  )}
                >
                  {day.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyStreaks;
