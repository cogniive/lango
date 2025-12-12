'use client';
import { X, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import streakData from '@/data/streak-data.json';

export default function StreakChallengePage() {
  const router = useRouter();
  
  // State for calendar navigation
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Extract data from JSON file
  const { currentStreak, longestStreak, todayChallengeDay, challengeTotalDays, milestones, calendar, callToAction } = streakData;
  
  // Navigation handlers
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Calendar generation with dynamic month/year
  const calendarData = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    const todayDate = today.getDate();
    
    // Mock completed days - in real app, this would come from API/database
    const completedDays = isCurrentMonth && currentYear === 2025 && currentMonth === 11 
      ? [1, 4, 9, 10, 11] 
      : currentMonth === 10 && currentYear === 2025 
      ? [5, 12, 15, 20, 25] 
      : [];
    
    const calendarDays = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} />);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompleted = completedDays.includes(day);
      const isToday = isCurrentMonth && day === todayDate;

      calendarDays.push(
        <div key={day} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition cursor-pointer hover:scale-105
              ${isCompleted
                ? "bg-purple-600 text-white shadow-md"
                : isToday
                ? "border-2 border-purple-400 text-purple-600"
                : "text-gray-400 hover:bg-gray-100"}
            `}
          >
            {day}
          </div>
        </div>
      );
    }
    
    return {
      calendarDays,
      monthName: new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" }),
      daysInMonth,
      firstDayOfMonth
    };
  }, [currentMonth, currentYear]);
  
  const { calendarDays, monthName } = calendarData;

  return (
    <div className="mx-auto md:max-w-[400px] p-4 mt-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => router.push('/home')}>
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">Streak details</h1>
        <div className="w-6" />
      </div>

      {/* Streak Banner */}
      <div className="bg-gradient-to-r from-purple-200 to-purple-100 rounded-2xl p-6 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-6xl font-bold text-purple-700">{currentStreak}</div>
          <p className="text-purple-700 font-medium">day streak!</p>
        </div>
        <div className="p-3 bg-purple-500 text-white rounded-full">
          <Zap className="w-6 h-6" />
        </div>
      </div>

      {/* Streak Challenge */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-2">Streak Challenge</h2>
        <p className="text-sm text-gray-600 mb-4">Day {todayChallengeDay} of {challengeTotalDays}</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            {milestones.map((milestone, index) => (
              <span key={index}>{milestone}</span>
            ))}
          </div>
          <div className="relative">
            <div className="h-3 bg-gray-200 rounded-full">
              <div 
                className="h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full relative"
                style={{ width: `${(todayChallengeDay / challengeTotalDays) * 100}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
            </div>
            {/* Milestone markers */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-1/4 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Streak Details */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Streak details</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current streak</span>
              <span className="text-lg font-semibold flex items-center gap-1">
                <Zap className="w-4 h-4 text-purple-600" />
                {currentStreak}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Longest streak</span>
              <span className="text-lg font-semibold">{longestStreak}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" 
            onClick={handlePreviousMonth}
          >
            &#8249;
          </button>
          <h2 className="text-md font-semibold">{monthName} {currentYear}</h2>
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" 
            onClick={handleNextMonth}
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="font-medium">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {calendarDays}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Zap className="w-5 h-5 text-purple-600" />
          <p className="text-sm">{callToAction}</p>
        </div>
      </div>
    </div>
  );
}
