import { redirect } from "next/navigation";

import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import AiChatInterface from "@/components/AiChatInterface";

const AiToolsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="w-full h-full mt-12">
      <AiChatInterface />
    </div>
  );
};

export default AiToolsPage;
