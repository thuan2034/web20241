import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feedwrapper";
import { StickyWrapper } from "@/components/stickywrapper";
import { UserProgress } from "@/components/userprogress";
import { getUnits, getUserProgress } from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [userProgress, units] = await Promise.all([userProgressData, unitsData]);

  if (!userProgress) redirect("/learn");

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
        {units.map((unit: { id: number; order: number; description: string; title: string; lessons: any[] }) => {
          const activeLesson = unit.lessons.find(lesson => lesson.status === "current");

          return (
            <div key={unit.id} className="mb-10">
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={activeLesson ? { id: activeLesson.id, unit: { id: unit.id } } : undefined}
                activeLessonPercentage={userProgress.lessonPercentage}
              />
            </div>
          );
        })}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;