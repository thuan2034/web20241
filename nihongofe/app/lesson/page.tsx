import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const getLesson = async () => {
  return {
    id: 1,
    challenges: [
      { challengeOptions: ["option1", "option2"], completed: false },
      { challengeOptions: ["option3", "option4"], completed: false },
      { challengeOptions: ["option5", "option6"], completed: false },
    ],
    hearts: 5,
  };
};

const LessonPage = async () => {
  const lessonData = getLesson();
  const [lesson] = await Promise.all([lessonData]);
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
