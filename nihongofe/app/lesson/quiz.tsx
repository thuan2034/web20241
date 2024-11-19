"use client";
import { useState } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import FlashcardSet from "./flashcard";
import MatchingPairsExercise from "./pairmatching";
import { Footer } from "./footer";
import { ResultCard } from "./result-card";
type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialHearts: number;
  initialLessonChallenges: {
    challengeOptions: {
      option: string;
      isCorrect: boolean;
      id: number;
    }[];
    completed: boolean;
    type: string;
    question: string;
  }[];
};
export const Quiz = ({
  initialPercentage,
  initialLessonId,
  initialHearts,
  initialLessonChallenges,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [count, setCount] = useState(0); // Initialize count state
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const onNext = () => {
    setActiveIndex((current) => current + 1);
    setSelectedOption(undefined);
    setStatus("none");
  };
  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };
  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "correct") {
      setPercentage((current) => current + 100 / challenges.length);
      onNext();
      setCount((current) => current + 1); // Increment count on correct answer
      return;
    } else if (status === "wrong") {
      onNext();
      return;
    }

    const correctOption = options.find((option) => option.isCorrect);
    if (correctOption && correctOption.id === selectedOption) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      // setHearts((current) => current - 1);
    }
  };
  if (!challenge) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
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

          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>

          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={count * 10} />{" "}
            {/* Use count state */}
            <ResultCard variant="hearts" value={Infinity} /> {/* hearts */}
          </div>
        </div>

        <Footer status="completed" disabled={false} />
      </>
    );
  }
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  return (
    <>
      {/* <Header hearts={hearts} percentage={percentage} testing={false} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption ?? -1} // might cause error
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer disabled={!selectedOption} status={status} onCheck={onContinue} /> */}
      <MatchingPairsExercise />
        <FlashcardSet />

    </>
  );
};
