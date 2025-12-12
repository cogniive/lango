"use client";

import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { Progress } from "@/components/ui";
import { 
  BookOpen, 
  HelpCircle, 
  Settings, 
  Award, 
  LogOut, 
  ChevronRight,
  Star,
  Trophy,
  Target,
  Zap
} from "lucide-react";

const ProfilePage = () => {
  const { signOut } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6 mt-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-32 mb-6"></div>
          <div className="bg-gray-200 rounded-2xl h-48 mb-6"></div>
          <div className="bg-gray-200 rounded-2xl h-64"></div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const certificates = [
    { name: "AI Fundamentals", icon: Target, progress: 100, color: "bg-green-500" },
    { name: "Machine Learning Basics", icon: Zap, progress: 85, color: "bg-blue-500" },
    { name: "Deep Learning", icon: Star, progress: 70, color: "bg-purple-500" },
    { name: "Natural Language Processing", icon: Trophy, progress: 60, color: "bg-orange-500" },
    { name: "Computer Vision", icon: Award, progress: 45, color: "bg-pink-500" },
    { name: "AI Ethics", icon: BookOpen, progress: 30, color: "bg-indigo-500" },
  ];

  const menuItems = [
    { icon: BookOpen, label: "Prompts Library", color: "bg-blue-100 text-blue-600" },
    { icon: HelpCircle, label: "Help", color: "bg-green-100 text-green-600" },
    { icon: Settings, label: "Settings", color: "bg-gray-100 text-gray-600" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 mt-12">
      {/* User Profile Section */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.firstName || "User"} {user?.lastName || ""}
            </h1>
            <p className="text-gray-600">
              {user?.primaryEmailAddress?.emailAddress || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          );
        })}
      </div>

      {/* Coursiu Junior Advertisement */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Coursiu Junior</h3>
            <p className="text-white/90 mb-4">Get personalized AI learning paths for kids!</p>
            <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100 border-0">
              Learn More
            </Button>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Certificates</h2>
        <div className="space-y-4">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cert.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{cert.name}</span>
                    <span className="text-sm text-gray-600">{cert.progress}%</span>
                  </div>
                  <Progress value={cert.progress} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Log Out Button */}
      <div className="pt-4">
        <Button 
          variant="danger" 
          className="w-full h-12 flex items-center justify-center space-x-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
