import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { updateStatusLesson } from "@/db/queries";
import { SessionKey, SessionStorage } from "../utils/session-storage";

type FooterProps = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
  isTest: boolean;
  isLesson: boolean;
  isPractice?: boolean;
};

export const Footer = ({
  onCheck,
  status,
  disabled,
  lessonId,
  isTest,
  isLesson,
  isPractice = false,
}: FooterProps) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "h-[100px] border-t-2 lg:h-[140px]",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="flex items-center text-base font-bold text-green-500 lg:text-2xl">
            <CheckCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Nicely done!
          </div>
        )}

        {status === "wrong" && (
          <div className="flex items-center text-base font-bold text-rose-500 lg:text-2xl">
            <XCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Wrong answer!
          </div>
        )}

        {status === "completed" && !isPractice && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => {
              updateStatusLesson(
                Number(SessionStorage.get(SessionKey.LESSON_ID))
              );
              SessionStorage.delete(SessionKey.LESSON_ID);
              if (isTest) {
                window.location.href = "/lesson";
              } else {
                window.location.href = `/lesson/${lessonId}`;
              }
            }}
          >
            Practice again
          </Button>
        )}
        {isTest ? (
          <Button
            className="ml-auto"
            onClick={onCheck}
            size={isMobile ? "sm" : "lg"}
            variant="primary"
          >
            Continue
          </Button>
        ) : (
          <Button
            disabled={disabled}
            aria-disabled={disabled}
            className="ml-auto"
            onClick={onCheck}
            size={isMobile ? "sm" : "lg"}
            variant={status === "wrong" ? "danger" : "secondary"}
          >
            {status === "none" && "Check"}
            {status === "correct" && "Next"}
            {status === "wrong" && isLesson && "Next"}
            {status === "wrong" && !isLesson && "Retry"}
            {status === "completed" && "Continue"}
          </Button>
        )}
      </div>
    </footer>
  );
};
