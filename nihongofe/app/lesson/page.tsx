import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const getLesson = async () => {
  return {
    id: 1,
    challenges: [
      {
        challengeOptions: [
          { id: 1, option: "Correct Answer 1", isCorrect: true },
          { id: 2, option: "Incorrect Answer 1", isCorrect: false },
          { id: 3, option: "Incorrect Answer 2", isCorrect: false },
          { id: 4, option: "Incorrect Answer 3", isCorrect: false },
        ],
        completed: false,
        type: "SELECT",
        question: "What is the correct answer for question 1?",
      },
      {
        challengeOptions: [
          { id: 1, option: "Correct Answer 2", isCorrect: true },
          { id: 2, option: "Incorrect Answer 1", isCorrect: false },
          { id: 3, option: "Incorrect Answer 2", isCorrect: false },
          { id: 4, option: "Incorrect Answer 3", isCorrect: false },
        ],
        completed: false,
        type: "SELECT",
        question: "What is the correct answer for question 2?",
      },
      {
        challengeOptions: [
          { id: 1, option: "Correct Answer 3", isCorrect: true },
          { id: 2, option: "Incorrect Answer 1", isCorrect: false },
          { id: 3, option: "Incorrect Answer 2", isCorrect: false },
          { id: 4, option: "Incorrect Answer 3", isCorrect: false },
        ],
        completed: false,
        type: "SELECT",
        question: "What is the correct answer for question 3?",
      },
    ],
    hearts: 5,
  };
};

const LessonPage = async () => {
  const lesson = await getLesson();

  if (!lesson) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialPercentage={initialPercentage}
      initialHearts={lesson.hearts}
    />
  );
};

export default LessonPage;
