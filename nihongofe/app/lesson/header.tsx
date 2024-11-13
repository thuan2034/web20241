import { X, InfinityIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
type Props = {
  hearts: number;
  percentage: number;
  testing: boolean;
};
export const Header = ({ hearts, percentage, testing }: Props) => {
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={() => {}}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
          width={28}
          height={28}
          alt="heart"
          className="mr-2"
        />
        {testing ? hearts : <InfinityIcon className="h-6 w-6 stroke-[3]" />}
      </div>
    </header>
  );
};
