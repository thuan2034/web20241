import { FeedWrapper } from "@/components/feedwrapper";

import { getPractices, getPracticeUnit } from "@/db/queries";
import { Header } from "../learn/header";
import { UnitBanner } from "../learn/unit-banner";
import { Quiz } from "@/app/lesson/quiz";

const PracticePage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const { unitId } = await searchParams;

  const practiceLessons = await getPracticeUnit(
    unitId ? Number(unitId.toString()) : undefined
  );

  const practices = await getPractices();

  if (practiceLessons) {
    const initialPercentage =
      (practiceLessons.challenges.filter(
        (challenge: { completed: boolean }) => challenge.completed
      ).length /
        practiceLessons.challenges.length) *
      100;

    return (
      <Quiz
        initialLessonId={Number(practiceLessons.id)}
        initialLessonChallenges={practiceLessons.challenges.map(
          (challenge) => ({
            ...challenge,
            id: Number(challenge.id),
            challengeId: Number(challenge.id),
            challengeOptions: challenge.challengeOptions.map((option) => ({
              ...option,
              challengeId: Number(challenge.id),
            })),
          })
        )}
        initialPercentage={initialPercentage}
        isPractice={true}
      />
    );
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <FeedWrapper>
        <Header title="Japanese" />
        <div className="flex flex-col gap-3">
          {practices.map((practice) => (
            <UnitBanner
              key={practice.id}
              title={practice.title}
              description={practice.description}
              activeLessonId={practice.unitId}
              isPractice
            />
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default PracticePage;
