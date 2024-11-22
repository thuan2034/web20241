import { redirect } from "next/navigation";

import { getLesson, getUserProgress} from "@/db/queries";

import { Quiz } from "./quiz";

const LessonPage = async () => {
  const lessonData = getLesson() as Promise<{ id: string; unitId: string; order: number; status: string; type: string; xpReward: number; challenges: { id: string; challengeId: string; text: string; correct: string; question?: string; imageSrc: string; audioSrc: string; challengeOptions: { id: number; text: string; correct: boolean; }[]; completed: boolean; type: string; }[] }>;
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge: { completed: boolean }) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={Number(lesson.id)}
      initialLessonChallenges={lesson.challenges.map(challenge => ({
        ...challenge,
        id: Number(challenge.id),
        challengeId: Number(challenge.challengeId),
        challengeOptions: challenge.challengeOptions.map(option => ({
          ...option,
          challengeId: Number(challenge.challengeId),
          imageSrc: challenge.imageSrc,
          audioSrc: challenge.audioSrc,
        })),
      }))}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonPage;