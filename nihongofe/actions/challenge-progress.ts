"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentLesson, getLessonById } from "@/db/queries";

export const upsertUserProgress = async (courseId: number) => {
  const courseResponse = await axios.get(`/api/courses/${courseId}`);
  const course = courseResponse.data;

  if (!course) throw new Error("Course not found.");

  if (!course.units.length || !course.units[0].lessons.length)
    throw new Error("Course is empty.");

  const existingUserProgress = await getCurrentLesson();

  if (existingUserProgress) {
    await axios.put(`/api/user-progress/${existingUserProgress.userId}`, {
      activeCourseId: courseId,
      userName: "User",
      userImageSrc: "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await axios.post(`/api/user-progress`, {
    userId: "user-id",
    activeCourseId: courseId,
    userName: "User",
    userImageSrc: "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number, challengeOptions: number) => {
  const currentUserProgress = await getCurrentLesson();

  if (!currentUserProgress) throw new Error("User progress not found.");

  const challengeResponse = await axios.get(`/api/challenges/${challengeId}`);
  const challenge = challengeResponse.data;

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;
  const lessonDetails = await getLessonById(lessonId);

  const existingChallengeProgressResponse = await axios.get(
    `/api/challenge-progress?userId=${currentUserProgress.userId}&challengeId=${challengeId}`
  );
  const existingChallengeProgress = existingChallengeProgressResponse.data;

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  await axios.put(`/api/user-progress/${currentUserProgress.userId}`, {
    points: currentUserProgress.points - 10,
  });

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getCurrentLesson();

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (currentUserProgress.points < 10)
    throw new Error("Not enough points.");

  await axios.put(`/api/user-progress/${currentUserProgress.userId}`, {
    points: currentUserProgress.points - 10,
  });

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};