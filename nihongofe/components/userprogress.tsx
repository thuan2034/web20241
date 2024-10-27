import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
type Props = {
  activeCourse: { title: string; imageSrc: string };
  hearts: number;
  points: number;
  testing: boolean;
};
export const UserProgress = ({
  activeCourse,
  points,
  hearts,
  testing,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/learn">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/learn">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
            alt="Points"
            className="mr-2"
            width={28}
            height={28}
          />
          {points}
        </Button>
      </Link>
      <Link href="/learn">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
            alt="Hearts"
            className="mr-2"
            width={22}
            height={22}
          />
          {testing ? hearts : <InfinityIcon className="h-4 w-4 stroke-[3]" />}
        </Button>
      </Link>
    </div>
  );
};
