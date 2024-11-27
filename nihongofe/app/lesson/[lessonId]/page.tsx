import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "@/db/queries";

import { Quiz } from "../quiz";
import FlashcardSet from "../flashcard";

export enum LESSON_TYPE {
  FLASHCARD = "flashcard",
  LESSON = "lesson",
  TEST = "test",
}

type LessonIdPageProps = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  const { lessonId } = await params;
  const lessonData = getLesson(Number(lessonId)) as Promise<{
    id: number;
    unitId: number;
    order: number;
    status: string;
    type: string;
    xpReward: number;
    challenges: {
      id: number;
      word: string;
      meaning: string;
      challengeId: number;
      text: string;
      correct: string;
      question?: string;
      imageSrc: string;
      audioSrc: string;
      challengeOptions: { id: number; text: string; correct: boolean }[];
      completed: boolean;
      type: string;
    }[];
  }>;
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  if (lesson.type === LESSON_TYPE.FLASHCARD) {
    return <FlashcardSet initFlashCards={lesson.challenges} />;
  }

  const initialPercentage =
    (lesson.challenges.filter(
      (challenge: { completed: boolean }) => challenge.completed
    ).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialPercentage={initialPercentage}
      isTest={lesson.type === LESSON_TYPE.TEST}
      isLesson={lesson.type === LESSON_TYPE.LESSON}
    />
  );
};

export default LessonIdPage;
