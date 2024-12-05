import { useParams, useRouter } from "next/navigation";

import { getLesson, getUserProgress } from "~/db/queries";

import { Quiz } from "~/lesson/quiz";
import FlashcardSet from "~/lesson/flashcard";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { SessionKey, SessionStorage } from "~/utils/session-storage";
import { manualParsedCoolies } from "~/utils/JWTService";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export enum LESSON_TYPE {
  FLASHCARD = "FLASHCARD",
  LESSON = "lesson",
  TEST = "test",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}

const LessonIdPage: NextPage = ({ lesson, type, lessonId, state }) => {
  if (type === LESSON_TYPE.FLASHCARD) {
    return <FlashcardSet initFlashCards={lesson} />;
  }

  if (lesson.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <p className="text-2xl font-medium text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="mt-4 text-gray-500">
            The link might be broken, or the page may have been removed.
          </p>
          <div className="mt-6">
            <Link
              href="/learn"
              className="rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
            >
              Go to Learn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const challenges = lesson;

  console.log(challenges);

  const initialPercentage =
    (challenges.filter(
      (challenge: { completed: boolean }) => challenge.completed,
    ).length /
      challenges.length) *
    100;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full w-full flex-col">
        <Quiz
          initialLessonId={Number(lessonId)}
          initialLessonChallenges={challenges.map((challenge) => ({
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
          isTest={state === LESSON_TYPE.TEST}
          isLesson={state !== LESSON_TYPE.TEST}
        />
      </div>
    </div>
  );
};

export default LessonIdPage;

export async function getServerSideProps({ req, params, query }) {
  const cookies = String(req?.headers?.cookie) ?? "";

  const parsedCookies = manualParsedCoolies(cookies);

  const myCookie = parsedCookies["token"] || null;

  if (!myCookie) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const jwtPayload = jwtDecode<{
    id: number;
  }>(myCookie);

  const { lessonId } = params; // Access the dynamic route parameter
  const { type, state } = query;

  const lesson = await getLesson(Number(lessonId), jwtPayload.id, String(type));

  return {
    props: {
      lesson,
      type,
      lessonId,
      state: state ?? "",
    },
  };
}
