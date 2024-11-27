"use client";
import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "@/db/queries";

import { use } from "react";
import { SessionKey, SessionStorage } from "../utils/session-storage";
import { LESSON_TYPE } from "./[lessonId]/page";
import FlashcardSet from "./flashcard";
import { Quiz } from "./quiz";

const LessonPage = () => {
  const lessonId = Number(SessionStorage.get(SessionKey.LESSON_ID)); // Replace with the actual lessonId
  const lessonData = getLesson(lessonId) as Promise<{
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

  const fetchData = async () => {
    const result = await Promise.all([lessonData, userProgressData]);

    return result;
  };

  const [lesson, userProgress] = use(fetchData());

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
      initialLessonId={Number(lesson.id)}
      initialLessonChallenges={lesson.challenges.map((challenge) => ({
        ...challenge,
        id: Number(challenge.id),
        challengeId: Number(challenge.challengeId),
        challengeOptions: challenge.challengeOptions.map((option) => ({
          ...option,
          challengeId: Number(challenge.challengeId),
          imageSrc: challenge.imageSrc,
          audioSrc: challenge.audioSrc,
        })),
      }))}
      initialPercentage={initialPercentage}
      isTest={lesson.type === LESSON_TYPE.TEST}
      isLesson={lesson.type === LESSON_TYPE.LESSON}
    />
  );
};

export default LessonPage;
