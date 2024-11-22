import { cache } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const DAY_IN_MS = 86_400_000;

export const getUserProgress = cache(async () => {
  const response = await axios.get(`${API_BASE_URL}/user-progress`);
  return response.data;
});

export const getUnits = cache(async () => {
  const response = await axios.get(`${API_BASE_URL}/units`);
  return response.data;
});

export const getCourseProgress = cache(async () => {
  const response = await axios.get(`${API_BASE_URL}/course-progress`);
  return response.data;
});

export const getLesson = cache(async (id?: number) => {
  const courseProgress = await getCourseProgress();
  const lessonId = id || courseProgress?.activeLessonId;
  if (!lessonId) return null;

  const response = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
  return response.data;
});

export const getLessonById = cache(async (lessonId: number) => {
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
