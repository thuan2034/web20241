"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

import { getUserProgress } from "@/db/queries";

export const upsertChallengeProgress = async (challengeId: number) => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");

  const challengeResponse = await axios.get(`/api/challenges/${challengeId}`);
  const challenge = challengeResponse.data;

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;

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
      points: currentUserProgress.points + 10,
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
    points: currentUserProgress.points + 10,
  });

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};