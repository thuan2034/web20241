"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

import { getCurrentLesson, getLessonById, getUnits } from "@/db/queries";
import { updateUserPoints } from "./updateUserPoints";
export const upsertChallengeProgress = async (challengeId: number) => {
  const currentUserProgress = await getCurrentLesson();

  if (!currentUserProgress) throw new Error("User progress not found.");

  const units = await getUnits();
  const lessons = units.flatMap((unit: { lessons: any[] }) => unit.lessons);
  const challengeLesson = lessons.find((lesson: { id: number }) => lesson.id === challengeId);

  if (!challengeLesson) throw new Error("Challenge not found.");

  const lessonId = challengeLesson.id;
  const lessonDetails = await getLessonById(lessonId);
  const challenge = lessonDetails.challenges.find((challenge: { id: number }) => challenge.id === challengeId);

  try {
    await axios.post(`/api/challenge-progress`, {
      challengeId,
      userId: currentUserProgress.userId,
      completed: true,
    });
  } catch (error) {
    console.error("Error marking challenge as completed:", error);
    throw new Error("Failed to mark challenge as completed.");
  }

  await updateUserPoints(currentUserProgress.userId, currentUserProgress.points, lessonDetails.exp);
  
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }
