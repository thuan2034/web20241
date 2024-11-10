import { cn } from "@/lib/utils";
import { Card } from "./card";
type Props = {
  options: { option: string; isCorrect: boolean; id: number }[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption: number;
  disabled: boolean;
  type: string;
};
export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type == "ASSIST" && "grid-cols-1",
        type == "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {options.map((option, index) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.option}
          shortcut={`${index + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          disabled={disabled}
          type={type}
          status={status}
        />
      ))}
    </div>
  );
};
