import { notFound } from "next/navigation";
import db from "@/server/db/drizzle";
import { eq } from "drizzle-orm";
import { challenges } from "@/server/db/schema";
import ChallengeDetail from "@/components/ChallengeDetail";
import ChallengePreview from "@/components/ChallengePreview";
import { redirect } from "next/navigation";
import { userChallenges } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";

export const maxDuration = 30;

interface ChallengePageProps {
  params: {
    id: string;
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/sign-in");
  }

  const challengeId = parseInt(params.id);
  
  if (isNaN(challengeId)) {
    return notFound();
  }

  // Fetch the challenge details
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    return notFound();
  }

  // Check if user has joined this challenge
  const userChallenge = await db.query.userChallenges.findFirst({
    where: (userChallenges, { and, eq }) => 
      and(
        eq(userChallenges.userId, userId),
        eq(userChallenges.challengeId, challengeId)
      ),
  });

  const hasJoined = !!userChallenge;

  // Prepare challenge data for the preview
  const challengePreviewData = {
    title: challenge.question || "Challenge",
    duration: "14 days",
    level: "Beginner",
    description: challenge.question || "Join this challenge to test your skills!",
  };

  if (!hasJoined) {
    return (
      <ChallengePreview 
        {...challengePreviewData}
        onJoin={async () => {
          'use server';
          // This will be handled by the server action
          await db.insert(userChallenges).values({
            userId,
            challengeId,
            joinedAt: new Date(),
          });
          // The page will re-render with hasJoined=true after the action completes
        }}
      />
    );
  }

  // If user has joined, show the challenge detail view
  return <ChallengeDetail />;
}

// Generate static params for all challenges
export async function generateStaticParams() {
  const allChallenges = await db.query.challenges.findMany();
  
  return allChallenges.map((challenge) => ({
    id: challenge.id.toString(),
  }));
}
