import { InfinityIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "~/lib/utils";

type ResultCardProps = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: ResultCardProps) => {
  const imageSrc =
    variant === "points"
      ? "https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
      : "https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg";

  return (
    <div
      className={cn(
        "w-full rounded-2xl border-2",
        variant === "points" && "border-orange-400 bg-orange-400",
        variant === "hearts" && "border-rose-500 bg-rose-500"
      )}
    >
      <div
        className={cn(
          "rounded-t-xl p-1.5 text-center text-xs font-bold uppercase text-white",
          variant === "points" && "bg-orange-400",
          variant === "hearts" && "bg-rose-500"
        )}
      >
        {variant === "hearts" ? "Hears Left" : "Total XP"}
      </div>

      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-white p-6 text-lg font-bold",
          variant === "points" && "text-orange-400",
          variant === "hearts" && "text-rose-500"
        )}
      >
        <Image
          src={imageSrc}
          alt={variant}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value === Infinity ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          value
        )}
      </div>
    </div>
  );
};
