import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { UserProgress } from "@/components";
import { Button } from "@/components/ui";
import ChallengeDetail from "@/components/ChallengeDetail";

const ChallengeDetailPage = async ({
  params,
}: {
  params: { challengeId: string };
}) => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress?.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 pt-8 mt-8">
      <div className="flex-1">
        <div className="mb-6">
          <Link href="/challenges" className="flex items-center text-sm hover:opacity-75 transition mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to challenges
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Challenges</h1>
              <div className="flex items-center gap-x-2">
                <p className="text-muted-foreground">
                  Complete daily challenges to improve your skills
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ChallengeDetail />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
