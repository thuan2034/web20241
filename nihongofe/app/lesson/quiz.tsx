"use client";
import { useState } from "react";
import { Header } from "./header";
type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialHearts: number;
  initialLessonChallenges: {
    challengeOptions: string[];
    completed: boolean;
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
  return (
    <>
      <Header hearts={hearts} percentage={percentage} />
    </>
  );
};
