import { cache } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getUnits = cache(async () => {
  const response = await axios.get(`${API_BASE_URL}/units`);
  return response.data; 
});

export const getLessonById = cache(async (lessonId:number) => {
  const response = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
  return response.data; 
});

export const getCurrentLesson = cache(async () => {
  const units = await getUnits();
  const currentLesson = units
    .flatMap((unit: { lessons: any[] }) => unit.lessons)
    .find((lesson: { status: string }) => lesson.status === "current");

  if (!currentLesson) return null;
  return await getLessonById(currentLesson.id); 
});

export const getPreviousLessons = cache(async () => {
  const units = await getUnits();
  const lessons = units.flatMap((unit: { lessons: any[] }) => unit.lessons);
  const currentLesson = lessons.find((lesson: { status: string }) => lesson.status === "current");
  if (!currentLesson) return [];
  return lessons.filter((lesson: { id: number }) => lesson.id < currentLesson.id);
});

export const getPracticeChallenges = cache(async () => {
  const previousLessons = await getPreviousLessons();
  const challenges = [];
  for (const lesson of previousLessons) {
    const lessonDetails = await getLessonById(lesson.id);
    const incompleteChallenges = lessonDetails.challenges.filter(
      (challenge: { completed: boolean }) => !challenge.completed
    );
    challenges.push(...incompleteChallenges);
  }

  return challenges;
});

export const isLessonCompleted = cache(async (lessonId:number) => {
  const units = await getUnits();
  const lesson = units
    .flatMap((unit: { lessons: any[] }) => unit.lessons)
    .find((lesson: { id: number; status: string }) => lesson.id === lessonId);

  return lesson?.status === "completed" || false; 
});
