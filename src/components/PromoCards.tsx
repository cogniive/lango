"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";

const PromoCards = () => {
  return (
    <div className="w-full md:w-[80%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prompts Library Card */}
        <div className="border-2 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              Prompts Library
            </h3>
            <p className="text-neutral-700 text-sm">
              The Complete AI Bundle<br />is now in the app!
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-6 right-6">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <div className="absolute bottom-6 right-6 bg-white/80 rounded-lg px-4 py-2 shadow-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <div className="w-2 h-2 rounded-full bg-purple-300"></div>
              <div className="w-2 h-2 rounded-full bg-purple-200"></div>
            </div>
          </div>
        </div>

        {/* Discover AI Tool Card */}
        <div className="border-2 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm text-neutral-600 mb-2">
              Take a 1-Minute Quiz
            </p>
            <h3 className="text-xl font-bold text-neutral-900">
              Discover Your Best AI Tool
            </h3>
          </div>
          
          {/* Decorative icons */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center transform rotate-12">
            <div className="w-6 h-6 bg-white rounded"></div>
          </div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCards;
