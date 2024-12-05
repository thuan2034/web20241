"use client";

import { useEffect, useState, useTransition } from "react";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { usePracticeModal } from "~/store/use-practice-modal";

import {
  updateQuestionRightAnswer,
  updateQuestionWrongAnswer,
  updateStatusLesson,
} from "~/db/queries";
import { getIdUserByToken } from "~/utils/JWTService";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { ResultCard } from "./result-card";

type QuizProps = {
  initialPercentage: number;
  initialLessonId: number;
  initialLessonChallenges: {
    id: number;
    challengeId: number;
    text: string;
    correct: string;
    question?: string;
    imageSrc: string;
    audioSrc: string;
    challengeOptions: {
      id: number;
      challengeId: number;
      option: string;
      isCorrect: boolean;
      imageSrc: string;
      audioSrc: string;
    }[];
    completed: boolean;
    type: string;
  }[];
  isTest: boolean;
  isLesson: boolean;
  isPractice?: boolean;
};

export const Quiz = ({
  initialPercentage,
  initialLessonId,
  initialLessonChallenges,
  isTest = false,
  isLesson = false,
  isPractice = false,
}: QuizProps) => {
  const [correctAudio, , correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, , incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });
  const { width, height } = useWindowSize();

  const router = useRouter();
  const params = useParams();
  const [pending, startTransition] = useTransition();
  const { open: openPracticeModal } = usePracticeModal();

  useEffect(() => {
    if (initialPercentage === 100) openPracticeModal();
  }, [initialPercentage, openPracticeModal]);

  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [lessonId] = useState(initialLessonId);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onContinue = async () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      if (isLesson) {
        onNext();
      }
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.isCorrect);
    if (!correctOption) return;

    const userId = getIdUserByToken();

    if (isTest) {
      if (correctOption.id === selectedOption) {
        setCorrectQuestions(correctQuestions + 1);
        setChallenges((prevChallenges) =>
          prevChallenges.map((ch) =>
            ch.id === challenge?.id ? { ...ch, completed: true } : ch,
          ),
        );
        await updateQuestionRightAnswer(Number(challenge?.id), Number(userId));
      } else {
        await updateQuestionWrongAnswer(Number(challenge?.id), Number(userId));
      }
      setPercentage((prev) => prev + 100 / challenges.length);
      onNext();
      setSelectedOption(undefined);
      return;
    }

    if (correctOption.id === selectedOption) {
      void correctControls.play();
      setCorrectQuestions(correctQuestions + 1);
      setStatus("correct");
      setPercentage((prev) => prev + 100 / challenges.length);
      setChallenges((prevChallenges) =>
        prevChallenges.map((ch) =>
          ch.id === challenge?.id ? { ...ch, completed: true } : ch,
        ),
      );
      await updateQuestionRightAnswer(Number(challenge?.id), Number(userId));
      // startTransition(() => {
      //   axios
      //     .post(`${API_BASE_URL}/challenge-progress`, {
      //       challengeId: challenge.id,
      //     })
      //     .then(() => {
      //       void correctControls.play();
      //       setStatus("correct");
      //       setPercentage((prev) => prev + 100 / challenges.length);
      //       setChallenges((prevChallenges) =>
      //         prevChallenges.map((ch) =>
      //           ch.id === challenge.id ? { ...ch, completed: true } : ch
      //         )
      //       );
      //     })
      //     .catch(() => toast.error("Something went wrong. Please try again."));
      // });
    } else {
      void incorrectControls.play();
      setStatus("wrong");
      if (isLesson) {
        await updateQuestionWrongAnswer(Number(challenge?.id), Number(userId));
        setPercentage((prev) => prev + 100 / challenges.length);
      }
      // startTransition(() => {
      //   axios
      //     .post(`${API_BASE_URL}/reduce-hearts`, { challengeId: challenge.id })
      //     .then(() => {
      //       void incorrectControls.play();
      //       setStatus("wrong");
      //     })
      //     .catch(() => toast.error("Something went wrong. Please try again."));
      // });
    }
  };

  const handleCompleted = async () => {
    const userId = getIdUserByToken();

    await updateStatusLesson(Number(params.lessonId), Number(userId));

    if (isPractice) {
      router.push("/practice");
    } else {
      router.push("/learn");
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          {!(isTest && correctQuestions < challenges.length / 2) && (
            <>
              <Image
                src="/finish.svg"
                alt="Finish"
                className="hidden lg:block"
                height={100}
                width={100}
              />

              <Image
                src="/finish.svg"
                alt="Finish"
                className="block lg:hidden"
                height={100}
                width={100}
              />
            </>
          )}

          {isTest && correctQuestions < challenges.length / 2 ? (
            <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
              You&apos;ve failed the lesson 🥲
            </h1>
          ) : (
            <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
              Great job! <br /> You&apos;ve completed the lesson.
            </h1>
          )}
          {!isPractice && (
            <div className="flex w-full items-center gap-x-4">
              <ResultCard variant="points" value={correctQuestions * 10} />
            </div>
          )}
        </div>

        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => {
            handleCompleted();
          }}
          isTest={isTest}
          isLesson={isLesson}
          isPractice={isPractice}
        />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header percentage={percentage} />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question ?? ""} />
              )}

              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
        isTest={isTest}
        isLesson={isLesson}
      />
    </>
  );
};
