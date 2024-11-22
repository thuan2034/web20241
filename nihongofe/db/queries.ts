import { cache } from "react";
import axios from "axios";

// Remove the import of auth from @clerk/nextjs
// import { auth } from "@clerk/nextjs";

const API_BASE_URL = "http://localhost:8080/api";

const DAY_IN_MS = 86_400_000;

export const getCourses = cache(async () => {
  const response = await axios.get(`${API_BASE_URL}/courses`);
  return response.data;
});

export const getUserProgress = cache(async () => {
  const userId = "mockUserId"; // Assume user is already authenticated
  const response = await axios.get(`${API_BASE_URL}/user-progress/${userId}`);
  return response.data;
});

export const getUnits = cache(async () => {
  const userId = "mockUserId"; // Assume user is already authenticated
  const userProgress = await getUserProgress();
  if (!userProgress?.activeCourseId) return [];

  const response = await axios.get(
    `${API_BASE_URL}/units?courseId=${userProgress.activeCourseId}`
  );
  return response.data;
});

export const getCourseById = cache(async (courseId: number) => {
  const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
  return response.data;
});

export const getCourseProgress = cache(async () => {
  const userId = "mockUserId"; // Assume user is already authenticated
  const userProgress = await getUserProgress();
  if (!userProgress?.activeCourseId) return null;

  const response = await axios.get(
    `${API_BASE_URL}/course-progress?courseId=${userProgress.activeCourseId}&userId=${userId}`
  );
  return response.data;
});

export const getLesson = cache(async (id?: number) => {
  const userId = "mockUserId"; // Assume user is already authenticated
  const courseProgress = await getCourseProgress();
  const lessonId = id || courseProgress?.activeLessonId;
  if (!lessonId) return null;

  const response = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
  return response.data;
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();
  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress?.activeLessonId);
  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(
    (challenge: { completed: boolean }) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

export const getTopTenUsers = cache(async () => {
  const response = await axios.get(`${API_BASE_URL}/top-ten-users`);
  return response.data;
});