import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { sidebarItems } from "@/constants";
import Logo from "./Logo";
import UserProgress from "./UserProgress";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { redirect } from "next/navigation";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui";
import HeaderNav from "@/components/HeaderNav";

const Header = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const user = await currentUser();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
  <div className="fixed top-0 left-0 right-0 border-b-2 bg-white py-3 z-50">
    <div className="mx-auto max-w-[1040px] flex items-center justify-between px-6">
      {/* Logo */}
      <Logo />

      {/* Navigation Items */}
      <HeaderNav />

      {/* Right Side - Points and Profile */}
      <div className="flex items-center gap-4">
        <UserProgress 
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        <div className="flex flex-col gap-y-4 mt-4">
          <div className="flex items-center justify-center gap-x-2 mb-4">
            <ClerkLoading>
              <SignedIn>
                <Button
                  disabled
                  size="rounded"
                  className="h-[40px] w-[40px] animate-pulse bg-gray-200 ring ring-border"
                />
  
                <div className="flex flex-col h-[30px] w-[50px] gap-y-1 p-2">
                  <div className="h-12 bg-gray-200 animate-pulse rounded-xl" />
                  {/* <div className="h-12 bg-gray-200 animate-pulse rounded-xl" /> */}
                </div>
              </SignedIn>
            </ClerkLoading>
  
            <ClerkLoaded>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonPopoverCard: {
                        pointerEvents: "initial",
                        width: "300px",
                      },
                      userButtonAvatarBox: {
                        height: "40px",
                        width: "40px",
                      },
                    },
                  }}
                />
  
                <div className="flex flex-col w-full p-2">
                  <span className="text-sm font-bold">
                    {user?.firstName || "Anon"}
                  </span>
  
                  {/* <span className="text-xs font-semibold">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span> */}
                </div>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Header;
