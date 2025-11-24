import { redirect } from "next/navigation";

import {
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import {
  FeedWrapper,
  UserProgress,
  LearningProgress,
} from "@/components";

const GuidesPage = async () => {
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

  // Sample guide data - replace with actual data from database
  const guides = [
    {
      id: 1,
      title: "Stable Diffusion",
      lessons: 14,
      levels: 2,
      image: "/guides/stable-diffusion.svg",
      color: "from-pink-200 to-purple-200",
    },
    {
      id: 2,
      title: "DeepSeek",
      lessons: 15,
      levels: 3,
      image: "/guides/deepseek.svg",
      color: "from-blue-200 to-cyan-200",
    },
    {
      id: 3,
      title: "Claude",
      lessons: 22,
      levels: 3,
      image: "/guides/claude.svg",
      color: "from-yellow-200 to-orange-200",
    },
    {
      id: 4,
      title: "ChatGPT",
      lessons: 20,
      levels: 3,
      image: "/guides/chatgpt.svg",
      color: "from-blue-300 to-cyan-300",
    },
    {
      id: 5,
      title: "Jasper AI",
      lessons: 14,
      levels: 2,
      image: "/guides/jasper.svg",
      color: "from-red-200 to-purple-200",
    },
  ];

  // Recommended courses data
  const recommendedCourses = [
    {
      id: 1,
      title: "First Steps to Profit with AI",
      lessons: 17,
      levels: 4,
      icon: "📊",
    },
    {
      id: 2,
      title: "Earning Through ChatGPT-4 in SMM",
      lessons: 25,
      levels: 5,
      icon: "💼",
    },
    {
      id: 3,
      title: "Click Catalyst: Mastering Performance Marketing",
      lessons: 25,
      levels: 5,
      icon: "📈",
    },
    {
      id: 4,
      title: "AI-Powered Online Income Strategies",
      lessons: 15,
      levels: 3,
      icon: "💡",
    },
    {
      id: 5,
      title: "AI Image Income",
      lessons: 15,
      levels: 3,
      icon: "🎨",
    },
  ];

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
        {/* Section 1: Learning Progress */}
        <div className="mb-6 mt-12">
          <LearningProgress />
        </div>

        {/* Section 2: Your Mastery Path */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">
              Your Mastery path
            </h1>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="group cursor-pointer rounded-xl overflow-hidden border-2 border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-md"
              >
                <div className={`h-32 bg-gradient-to-br ${guide.color} flex items-center justify-center p-4`}>
                  <div className="w-20 h-20 flex items-center justify-center">
                    <div className="text-6xl">🎨</div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-neutral-900 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Lessons {guide.lessons} • {guide.levels} levels
                  </p>
                  <div className="mt-3 h-2 bg-blue-600 rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Recommended for you */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">
              Recommended for you
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="group cursor-pointer rounded-xl border-2 border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-md bg-white p-4"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-4xl">
                    {course.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-600 mb-1">
                      Lessons {course.lessons} • {course.levels} levels
                    </p>
                    <h3 className="font-bold text-neutral-900 text-base leading-tight">
                      {course.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default GuidesPage;
