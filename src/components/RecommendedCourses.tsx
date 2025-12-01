'use client';

import { useRouter } from "next/navigation";


type RecommendedCoursesProps = {
  course?: any;
  key?: string;
};
const RecommendedCourses = ({course, key}:RecommendedCoursesProps) => {
    const router = useRouter();
  return (
    <div
        key={course.id}
        onClick={() => router.push(`/guides/${course.id}`)}
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
  )
}

export default RecommendedCourses