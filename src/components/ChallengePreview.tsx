import { Button } from "./ui";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface ChallengePreviewProps {
  title: string;
  duration: string;
  level: string;
  description: string;
  onJoin: () => void;
  isJoining?: boolean;
}

const ChallengePreview = ({
  title,
  duration,
  level,
  description,
  onJoin,
  isJoining = false,
}: ChallengePreviewProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center text-gray-600">
            <span className="font-medium">Duration:</span>
            <span className="ml-2">{duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="font-medium">Level:</span>
            <span className="ml-2">{level}</span>
          </div>
        </div>
        <Button 
          onClick={onJoin} 
          disabled={isJoining}
          className="px-8 py-6 text-lg font-semibold"
        >
          {isJoining ? 'Joining...' : 'Join now'}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How it works</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Daily Lessons</h3>
              <p className="text-sm text-gray-600">Complete quick, engaging lessons each day</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Progress</h3>
              <p className="text-sm text-gray-600">See your improvement with our progress tracker</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Unlock achievements and badges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">M</div>
              <div>
                <h3 className="font-semibold text-gray-900">Maya</h3>
                <p className="text-sm text-gray-500">Completed 28-Day Challenge</p>
              </div>
            </div>
            <p className="text-gray-700">"This challenge completely transformed how I approach language learning. The daily lessons were engaging and I loved seeing my progress each week!"</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mr-4">L</div>
              <div>
                <h3 className="font-semibold text-gray-900">Leo</h3>
                <p className="text-sm text-gray-500">Completed 14-Day Challenge</p>
              </div>
            </div>
            <p className="text-gray-700">"I was a complete beginner when I started, but the structured approach made it so easy to follow. I can't believe how much I learned in just two weeks!"</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Button 
          onClick={onJoin} 
          disabled={isJoining}
          className="px-12 py-6 text-lg font-semibold"
        >
          {isJoining ? 'Joining...' : 'Join the Challenge'}
        </Button>
      </div>
    </div>
  );
};

export default ChallengePreview;
