import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feedwrapper";
import { StickyWrapper } from "@/components/stickywrapper";
import { UserProgress } from "@/components/userprogress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";

// Temporary fake lessons data
const fakeLessons = [
  { id: 1, unitId: 1, title: "Lesson 1", status: "completed", order: 1, type: "video", xpReward: 100, completed: true },
  { id: 2, unitId: 1, title: "Lesson 2", status: "current", order: 2, type: "quiz", xpReward: 50, completed: false },
  { id: 3, unitId: 2, title: "Lesson 3", status: "not started", order: 3, type: "reading", xpReward: 75, completed: false },
];

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits() as Promise<{ id: number; title: string; description: string; order: number }[]>;

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
  ]);

  if (!courseProgress || !userProgress)
    redirect("/learn");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          points={userProgress.points}
          testing={false}
          activeCourse={{ title: "Japanese", imageSrc: "/jp.svg" }}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Japanese" />
        {units.map((unit: { id: number; order: number; description: string; title: string }) => {
          const unitLessons = fakeLessons.filter(lesson => lesson.unitId === unit.id);
          const activeLesson = unitLessons.find(lesson => lesson.status === "current")
            ? { 
                id: unitLessons.find(lesson => lesson.status === "current")!.id,
                unitId: unitLessons.find(lesson => lesson.status === "current")!.unitId,
                title: unitLessons.find(lesson => lesson.status === "current")!.title,
                status: unitLessons.find(lesson => lesson.status === "current")!.status,
                order: unitLessons.find(lesson => lesson.status === "current")!.order,
                type: unitLessons.find(lesson => lesson.status === "current")!.type,
                xpReward: unitLessons.find(lesson => lesson.status === "current")!.xpReward,
                completed: unitLessons.find(lesson => lesson.status === "current")!.completed,
                unit 
              }
            : undefined;

          return (
            <div key={unit.id} className="mb-10">
              <Unit
                id={unit.id}
                description={unit.description}
                title={unit.title}
                lessons={unitLessons} // Ensure lessons are passed
                activeLesson={activeLesson} // Set active lesson
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          );
        })}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;