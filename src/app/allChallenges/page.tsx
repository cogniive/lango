import { redirect } from "next/navigation";
import { challenges } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import db from "@/server/db/drizzle";

export const maxDuration = 30;

export default async function ChallengesPage() {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/sign-in");
  }

  // Fetch all challenges
  const allChallenges = await db.query.challenges.findMany();
  
  // Fetch user's joined challenges
  const userChallenges = await db.query.userChallenges.findMany({
    where: (userChallenges, { eq }) => eq(userChallenges.userId, userId),
    with: {
      challenge: true
    }
  });

  // Create a set of joined challenge IDs for quick lookup
  const joinedChallengeIds = new Set(userChallenges.map((uc: { challengeId: any; }) => uc.challengeId));

  // Mock data for the challenges - in a real app, this would come from your database
  const challengeData = [
    {
      id: 1,
      title: "2025 28-Day AI Challenge",
      duration: "28 days",
      level: "Beginner",
      image: "/challenges/ai-challenge.png",
      bgColor: "from-blue-50 to-green-50",
      description: "Master AI in just 28 days with our comprehensive challenge.",
    },
    {
      id: 2,
      title: "No Code Challenge",
      duration: "14 days",
      level: "Beginner",
      image: "/challenges/no-code.png",
      bgColor: "from-blue-50 to-purple-50",
      description: "Build apps without writing a single line of code.",
    },
    // Add more challenges as needed
  ];

  return (
    <div className="w-full py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Challenges</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengeData.map((challenge) => {
            const isJoined = joinedChallengeIds.has(challenge.id);
            
            return (
                <div
                key={challenge.id}
                className={`border-2 rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${
                    isJoined ? 'ring-2 ring-blue-500' : ''
                }`}
                >
                <Link href={`/challenges/${challenge.id}`}>
                   <div className={`relative h-48 bg-gradient-to-br ${challenge.bgColor} flex items-center justify-center p-6`}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-6xl">🎯</div>
                    </div>
                    {isJoined && (
                      <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Joined
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-2">
                      {challenge.duration} • {challenge.level}
                    </p>
                    <p className="text-sm text-neutral-700">
                      {challenge.description}
                    </p>
                  </div>
                </Link>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
}
