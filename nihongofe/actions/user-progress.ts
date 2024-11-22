"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

import { getCurrentLesson, getLessonById, getUnits } from "@/db/queries";
import exp from "constants";

export const upsertChallengeProgress = async (challengeId: number) => {
  const currentUserProgress = await getCurrentLesson();

  if (!currentUserProgress) throw new Error("User progress not found.");

  const units = await getUnits();
  const lessons = units.flatMap((unit: { lessons: any[] }) => unit.lessons);
  const challengeLesson = lessons.find((lesson: { challenges: any[] }) =>
    lesson.challenges.some((challenge: { id: number }) => challenge.id === challengeId)
  );

  if (!challengeLesson) throw new Error("Challenge not found.");

  const lessonId = challengeLesson.id;
  const lessonDetails = await getLessonById(lessonId);
  const challenge = lessonDetails.challenges.find((challenge: { id: number }) => challenge.id === challengeId);

  const existingChallengeProgressResponse = await axios.get(
    `/api/challenge-progress?userId=${currentUserProgress.userId}&challengeId=${challengeId}`
  );
  const existingChallengeProgress = existingChallengeProgressResponse.data;

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    await axios.put(`/api/challenge-progress/${existingChallengeProgress.id}`, {
      completed: true,
    });

    await axios.put(`/api/user-progress/${currentUserProgress.userId}`, {
      points: currentUserProgress.points,
    });

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await axios.post(`/api/challenge-progress`, {
    challengeId,
    userId: currentUserProgress.userId,
    completed: true,
  });

  await axios.put(`/api/user-progress/${currentUserProgress.userId}`, {
    points: currentUserProgress.points + exp,
  });

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};