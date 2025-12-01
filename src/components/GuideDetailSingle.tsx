'use client';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const GuideDetailSingle = ({section}) => {
    const [openSections, setOpenSections] = useState<Set<string>>(new Set());
      const toggleSection = (sectionId: string) => {
          const newOpenSections = new Set(openSections);
          if (newOpenSections.has(sectionId)) {
            newOpenSections.delete(sectionId);
          } else {
            newOpenSections.add(sectionId);
          }
          setOpenSections(newOpenSections);
        };
    const isOpen = openSections.has(section?.id.toString());
  return (
        <div key={section.id} className="border rounded-xl overflow-hidden">
            <button
                onClick={() => toggleSection(section?.id.toString())}
                className="flex items-center justify-between w-full bg-gray-50 px-6 py-4 border-b cursor-pointer hover:bg-gray-100 transition-colors"
            >
                <h3 className="font-bold text-lg text-neutral-900">{section.title}</h3>
                {isOpen ? (
                <ChevronUp className="text-neutral-500" />
                ) : (
                <ChevronDown className="text-neutral-500" />
                )}
            </button>
            {isOpen && (
                <div className="divide-y">
                {section.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-6">
                    {lesson.isFeatured ? (
                        <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-3xl flex-shrink-0">
                            {lesson.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h4 className="font-bold text-lg text-neutral-900">
                                {lesson.title}
                            </h4>
                            <span className="text-sm text-neutral-500">
                                {lesson.duration}
                            </span>
                            </div>
                            {lesson.description && (
                            <p className="text-neutral-600 mt-2">{lesson.description}</p>
                            )}
                        </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {lesson.icon}
                            </div>
                            <span className="font-medium text-neutral-900">
                            {lesson.title}
                            </span>
                        </div>
                        <span className="text-sm text-neutral-500">
                            {lesson.duration}
                        </span>
                        </div>
                    )}
                    </div>
                ))}
                </div>
            )}
        </div>
        );
};

export default GuideDetailSingle;