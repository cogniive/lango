import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/server/db/schema";

interface UserProgressProps {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => (
  <div className="flex w-full items-center justify-between md:gap-x-0.5 lg:gap-x-2">
    <Link href="/streak-challenge">
      <Button variant="defaultOutline" className="text-orange-500">
        <Image
          alt="Points"
          src="/points.svg"
          height={28}
          width={28}
          className="mr-2"
        />
        {points}
      </Button>
    </Link>
  </div>
);

export default UserProgress;
