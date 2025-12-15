import { redirect } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";


import { useState } from 'react';

import {
  getUserProgress,
  getUserSubscription,
  getGuide
} from "@/server/db/queries";
import { FeedWrapper, UserProgress } from "@/components";
import { Button } from "@/components/ui";
import GuideDetailSingle from "@/components/GuideDetailSingle";
import { lessons } from "@/server/db/schema";

// import { Button } from "@/components/ui/button";
// import { FeedWrapper } from "@/components/FeedWrapper";
// import { UserProgress } from "@/components/UserProgress";

const GuideDetailPage = async ({
  params,
}: {
  params: { guideId: string };
}) => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const guide = getGuide(params.guideId)

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // Mock data for the guide - in a real app, this would come from your database
  

  return (
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-[48px] px-6 pt-8">
      <div className="md:hidden border-b-2 py-3">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <FeedWrapper>
        <div className="mb-6 mt-5">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/guides">
              <Button size="icon" className="h-10 w-10">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">{guide.title}</h1>
              <p className="text-neutral-600">{guide?.subtitle}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">{guide.title}</h2>
                <p className="text-neutral-600 mb-4 md:mb-0">{guide.subtitle}</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg inline-block">
                <span className="font-medium">{guide.duration}</span>
              </div>
            </div>
          </div>

            <div className="space-y-4">
              {guide.sections.map((section) => {
                return (
                  <div key={section.id}>
                    <GuideDetailSingle section={section} />
                  </div>
                );
              })}
            </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default GuideDetailPage;
